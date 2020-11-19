<template lang='pug'>
.horizontal-striped-bar-chart
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
	name : 'horizontal-striped-bar-chart',

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
		yAxisLabels : null,
		bars        : null,
		barPadding  : 5,
		labelWidth  : 30,
		numOfLines  : 8
	} ),

	computed : {
		numberOfGaps() {
			return this.data.length + 1;
		},

		totalSpaceTakenUpByPadding() {
			const { barPadding, numberOfGaps } = this;

			return barPadding * numberOfGaps;
		},

		maxBarWidth() {
			const { ah, totalSpaceTakenUpByPadding, data } = this;
			return ( ah - totalSpaceTakenUpByPadding ) / data.length;
		},

		barWidth() {
			return Math.min( this.maxBarWidth, 35 );
		}
	},

	mounted() {
		this.init( this.$refs.svg );
	},

	watch : {

	},

	methods : {
		draw() {
			// set beginning dims
			this.updateDims( {
				l : 5,
				t : 5,
				r : this.labelWidth + 5
			} );

			// get drawable data
			const illustrationData = this.getIllustrationData( this.data );

			// create groups
			this.barGroups = this.createBarGroups( illustrationData );

			// draw X axis labels
			this.drawYAxisLabels( this.barGroups );

			this.drawAxisLines();

			// draw the bars
			this.drawBars( this.barGroups );
		},

		getIllustrationData( data ) {
			const { t } = this;
			const range                    = this.getDataRange( data.map( a => a.value ), false );
			const { barWidth, barPadding } = this;
			return data.map( ( d, i ) => ( {
				label       : d.label,
				y           : t + ( barWidth * i ) + ( barPadding * i ),
				width       : barWidth,
				textY       : ( t + ( barWidth * i ) + ( barPadding * i ) ) + ( barWidth / 2 ),
				xProportion : ( d.value - range.start ) / ( range.end - range.start ) || 0,
				valueLabel  : d.value
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

		drawBars( barGroups ) {

			const getX = ( d ) => {
				const padding = 5;
				const startX = this.l + padding;
				const endX   = this.l + padding + ( this.aw * d.xProportion );
				console.log( 'return stuiff in drawBars', { startX, endX } );
				return {
					startX,
					endX
				};
			};

			this.bars = barGroups
				.append( 'path' )
				.attr( 'd', ( d ) => {
					const { startX, endX } = getX( d );
					console.log( `M ${startX} ${d.textY} L ${endX} ${d.textY}` );
					return `M ${startX} ${d.textY} L ${endX} ${d.textY}`;
				} )
				.style( 'stroke', this.legend.default.color )
				.style( 'stroke-width', d => d.width )
				.style( 'stroke-dasharray', '2 2' );

			this.barLabelGroups = barGroups
				.append( 'g' );


			const spaceBetweenLabelAndBar = 2;

			this.barLabelGroups.append( 'rect' )
				.attr( 'x', d => getX( d ).endX + spaceBetweenLabelAndBar )
				.attr( 'y', d => d.textY - ( d.width / 2 ) )
				.attr( 'width', this.labelWidth )
				.attr( 'fill', this.legend.default.color )
				.attr( 'height', d => d.width );

			const textLabels = this.barLabelGroups.append( 'text' )
				.attr( 'x', d => getX( d ).endX + spaceBetweenLabelAndBar + ( this.labelWidth / 2 ) )
				.attr( 'y', d => d.textY )
				.attr( 'class', 'bar-value' )
				.attr( 'text-anchor', 'middle' )
				.attr( 'dominant-baseline', 'middle' )
				.style( 'fill', colors.white )
				.text( d => d.valueLabel );

		},

		drawYAxisLabels( barGroups ) {
			this.yAxisLabels = barGroups
				.append( 'text' )
				.attr( 'class', 'y-axis-labels' )
				.attr( 'x', this.l )
				.attr( 'y', d => d.textY )
				.attr( 'text-anchor', 'start' )
				.attr( 'dominant-baseline', 'middle' )
				.attr( 'font-size', '12px' )
				.text( d => d.label );

			this.changeWithMode( {
				nodes   : this.yAxisLabels,
				options : {
					day : {
						style : [
							['fill', colors.grey],
						],
					},
					night : {
						style : [
							['fill', colors.white],
						],
					},
				},
			} );
			const textNodes      = Array.from( this.yAxisLabels._groups[0] );
			const textNodeWidths = textNodes.map( node => node.getBBox().width );
			const largestWidth   = Math.max( ...textNodeWidths );

			this.updateDims( {
				l : largestWidth + 10,
			} );

			return this.yAxisLabels;
		},

		drawAxisLines() {
			const { l } = this;
			const labelData = [];

			const heightOfAllBars = ( this.barWidth * this.data.length ) + ( this.barPadding * ( this.data.length + 1 ) );
			const width = this.aw / this.numOfLines;

			for ( let i = 0; i < this.numOfLines; i++ ) {
				const x = l + ( i * width );
				labelData.push( {
					x,
					dayColor   : colors.white,
					nightColor : colors.grey,
				} );
			}

			const lineGroups = this.canvas
				.selectAll( `.line-indicators-${this.id}` )
				.data( labelData )
				.enter()
				.append( 'g' ) // will append as many g's as the length of labelData
				.attr( 'class', `line-indicators-${this.id}` )
				.lower();

			lineGroups.append( 'path' )
				.attr( 'd', d => `M ${d.x} ${0} L ${d.x} ${heightOfAllBars}` )
				.attr( 'class', `dynamic-stroke-${this.id}` )
				.style( 'stroke-width', 1 )
				.style( 'stroke-dasharray', '2 4' )
				.style( 'stroke', this.mode === 'day' ? colors.grey : colors.white );

			return lineGroups;
		}

	},
};
</script>

<style lang='scss'>
.horizontal-striped-bar-chart {
	display: flex;
	flex-direction: column;

	.title {
		align-self: flex-start;
		margin-bottom: 10px;

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
