<template lang='pug'>
.striped-bar-chart
	.title
		h1.dynamic-mode-text.dynamic-mode-border.bottom {{ title }}
	.chart
		svg(ref='svg')
</template>

<script>
import colors from '@/assets/js/colors';
import BaseChart from '@/components/charts/BaseChart';
import * as d3 from 'd3';

export default {
	name : 'striped-bar-chart',

	extends : BaseChart,

	props : {
		title : {
			type     : String,
			required : true,
		},

		options : {
			type    : Object,
			default : () => ( {
				maxTextLength : 150,
				padding       : 5,
			} )
		}
	},

	data : () => ( {
		barGroups   : null,
		xAxisLabels : null,
	} ),

	mounted() {
		this.init( this.$refs.svg );
	},

	watch : {

		'options.preferredBValue' : {
			immediate : true,
			handler( bValue ) {
				if ( typeof bValue !== 'number' || !this.xAxisLabels ) {
					return;
				}

				this.updateDims( {
					b : bValue,
				} );

				if ( this.barGroups ) {
					this.barGroups
						.selectAll( 'path' )
						.remove();

					this.barGroups
						.selectAll( 'g' )
						.remove();
				}

				this.realignXAxisLabels( this.xAxisLabels, true );
				this.drawBars( this.barGroups );
			}
		}
	},

	methods : {
		draw() {
			// set beginning dims
			this.updateDims( {
				l : 5,
				r : 5,
			} );

			// get drawable data
			const illustrationData = this.getIllustrationData( this.data );

			// create groups
			this.barGroups = this.createBarGroups( illustrationData );

			// draw X axis labels
			this.drawXAxisLabels( this.barGroups );

			// draw the bars
			this.drawBars( this.barGroups );
		},

		getIllustrationData( data ) {
			const {
				l,
				// + see below comment about barWidth
				// aw,
			} = this;

			const range                      = this.getDataRange( data.map( a => a.value ), false );
			const barPadding                 = 5;
			const numberOfGaps               = data.length + 1;
			const totalSpaceTakenUpByPadding = barPadding * numberOfGaps;
			const maxBarWidth                = ( this.aw - totalSpaceTakenUpByPadding ) / this.data.length;
			const barWidth                   = Math.min( maxBarWidth, 30 );

			// + Set barWidth to this value if you want the
			// + bars to be spaced evenly across the entire
			// + chart
			// const barWidth = (
			// 	( aw - totalSpaceTakenUpByPadding )
			// 	/ ( data.length - 1 )
			// );

			return data.map( ( d, i ) => ( {
				label       : d.label,
				x           : l + ( barWidth * i ) + ( barPadding * i ),
				width       : barWidth,
				textX       : ( l + ( barWidth * i ) + ( barPadding * i ) ) + ( barWidth / 2 ),
				yProportion : ( d.value - range.start ) / ( range.end - range.start ),
				valueLabel  : d.value,
			} ) );
		},

		createBarGroups( data ) {
			return this.canvas
				.selectAll( '.bar-groups' )
				.data( data )
				.enter()
				.append( 'g' )
				.attr( 'class', 'bar-groups' );
		},

		drawXAxisLabels( barGroups ) {

			if ( typeof this.options.preferredBValue === 'number' ) {
				this.updateDims( {
					b : this.options.preferredBValue,
				} );
			}

			this.xAxisLabels = barGroups
				.append( 'text' )
				.attr( 'class', 'x-axis-labels' )
				.attr( 'x', d => d.textX )
				.attr( 'y', this.t + this.ah )
				.attr( 'text-anchor', 'start' )
				.attr( 'dominant-baseline', 'middle' )
				.text( d => d.label );

			this.wrapText( this.xAxisLabels, this.options.maxTextLength );

			this.changeWithMode( {
				nodes   : this.xAxisLabels,
				options : {
					day : {
						attr : [
							['fill', colors.dayTextDefault],
						],
					},
					night : {
						attr : [
							['fill', colors.nightTextDefault],
						],
					},
				}
			} );

			const newBottomValue = this.realignXAxisLabels( this.xAxisLabels );

			this.$emit( 'b-value', newBottomValue );

			return this.xAxisLabels;

		},

		realignXAxisLabels( xAxisLabels ) {

			const textNodes      = Array.from( xAxisLabels._groups[0] );
			const textNodeWidths = textNodes.map( node => node.getBBox().width );
			const largestWidth   = Math.max( ...textNodeWidths );

			if ( largestWidth > this.b ) {
				this.updateDims( {
					b : largestWidth,
				} );
			}

			const newY = this.h - this.b;

			xAxisLabels.selectAll( 'tspan' )
				.attr( 'y', newY );

			xAxisLabels.attr( 'y', newY )
				.attr( 'text-anchor', 'end' )
				.attr( 'transform', d => `rotate(-90, ${d.textX}, ${newY})` );

			return this.b;
		},

		drawBars( barGroups ) {

			const getY = ( d ) => {
				const trueAH = ( this.ah - ( this.options.padding || 15 ) );
				const startY = this.t + trueAH;
				const endY   = ( trueAH - trueAH * d.yProportion );

				return {
					startY,
					endY,
				};
			};

			const verticalPadding = 5;

			this.bars = barGroups
				.append( 'path' )
				.attr( 'd', ( d ) => {
					const { startY, endY } = getY( d );

					return `M ${d.textX} ${startY} L ${d.textX} ${endY}`;
				} )
				.style( 'stroke', this.legend.default.color )
				.style( 'stroke-width', 0 )
				.style( 'stroke-dasharray', '4 3' );

			this.barLabelGroups = barGroups
				.append( 'g' )
				.style( 'opacity', 0 );

			const textLabels = this.barLabelGroups.append( 'text' )
				.attr( 'x', d => d.textX )
				.attr( 'class', 'bar-value' )
				.attr( 'text-anchor', 'middle' )
				.attr( 'dominant-baseline', 'middle' )
				.style( 'fill', colors.white )
				.text( d => d.valueLabel );

			const textDims = Array.from(
				textLabels._groups[0]
			).map(
				text => d3.select( text )
					.node()
					.getBBox()
			);

			const maxTextWidth  = Math.max( ...textDims.map( dims => dims.width ) );
			const maxTextHeight = Math.max( ...textDims.map( dims => dims.height ) );

			const rectangleHeight = maxTextWidth + ( 2 * verticalPadding );
			const rectangleWidth  = maxTextHeight + ( 2 * verticalPadding );

			this.barLabelGroups.append( 'rect' )
				.lower()
				.attr( 'x', d => d.x + ( d.width / 2 ) - ( rectangleWidth / 2 ) )
				.attr( 'width', rectangleWidth )
				.attr( 'fill', this.legend.default.color )
				.attr( 'height', rectangleHeight )
				.attr( 'y', ( d ) => {
					const { endY } = getY( d );
					let y = endY - rectangleHeight;

					if ( d.yProportion !== 0 ) {
						y -= verticalPadding;
					}

					return y;
				} );

			textLabels
				.attr( 'y', ( d ) => {
					const { endY } = getY( d );
					let y = endY - ( rectangleHeight / 2 );

					if ( d.yProportion > 0 ) {
						y -= verticalPadding;
					}

					return y;
				} )
				.attr( 'transform', ( d ) => {
					const { endY } = getY( d );
					let y = endY - ( rectangleHeight / 2 );

					if ( d.yProportion > 0 ) {
						y -= verticalPadding;
					}

					return `rotate(-90, ${d.textX}, ${y})`;
				} );

			this.bars
				.transition()
				.duration( 200 )
				.delay( ( d, i ) => i * 50 )
				.style( 'stroke-width', d => `${d.width}px` );

			this.barLabelGroups
				.transition()
				.duration( 200 )
				.delay( ( d, i ) => 50 + ( i * 50 ) )
				.style( 'opacity', 1 );

		}
	},
};
</script>

<style lang='scss'>
.striped-bar-chart {
	display: flex;
	flex-direction: column;

	.title {
		align-self: flex-start;

		h1 {
			font-size: 18px;
			font-weight: 500;
			text-align: left;
			padding-bottom: 10px;
			display: inline-block;
			position: relative;
			left: 0;
		}
	}

	.chart {
		width: 100%;
		flex: 1 1 0;

		svg {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
