<template lang='pug'>
.labeled-bar-chart.dynamic-mode-background
	.title
		h1.dynamic-mode-text {{ title }}
		h1.sub-title.dynamic-mode-text {{ subTitle }}
	.chart
		svg(ref='svg')
</template>

<script>
import colors from '@/assets/js/colors';
import BaseChart from '@/components/charts/BaseChart';
import * as d3 from 'd3';

export default {
	name : 'labeled-bar-chart',

	extends : BaseChart,

	props : {
		title : {
			type     : String,
			required : true,
		},

		subTitle : {
			type : String
		},

		options : {
			type    : Object,
			default : () => ( {
				numberOfIndicators : 7,
				hasBarLabels       : false,
				isDefaultRange     : false
			} )
		}
	},

	data : () => ( {
		barGroups       : null,
		bars            : null,
		xAxisLabels     : null,
		barLabelHeight  : 30,
		barLabelSpacing : 5
	} ),

	computed : {
		barWidth() {
			const { aw, data } = this;
			return Math.min( aw / data.length, 25 );
		},

		barSpacing() {
			const { barWidth, data, aw } = this;

			return ( aw - ( barWidth * data.length ) ) / data.length;
		},

		range() {
			const { isDefaultRange } = this.options;

			if ( isDefaultRange ) {
				return {
					min : 0,
					max : 100
				};
			}

			const { data } = this;
			const values = data.map( d => d.value );
			const range = this.getDataRange( values, false );

			return {
				min : range.start,
				max : range.end
			};
		},

		labelTextSize() {
			return this.barWidth * 0.75;
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
				r : 5,
				t : 10
			} );

			const { hasBarLabels, numberOfIndicators } = this.options;


			console.log( 'this.options', this.options );

			if ( hasBarLabels ) {
				this.updateDims( {
					t : this.t + this.barLabelHeight + this.barLabelSpacing
				} );
			}

			console.log( 'this.data', this.data );
			this.barGroups = this.createBarGroups( this.data );

			console.log( 'bargroups', this.barGroups );

			this.xAxisLabels = this.drawXAxisLabels( this.barGroups );
			console.log( 'xAxisLabels', this.xAxisLabels );
			// draw labels
			const lineIndicators = this.drawAxisIndicators( {
				range    : this.range,
				axis     : 'y',
				postChar : '',
				lines    : {
					spaceBetweenLabelsAndLines : 5,
					numberOfIndicators         : numberOfIndicators || 5,
				},
				dayColor   : colors.grey,
				nightColor : colors.white,
			} );

			this.xAxisLabels.attr( 'x', ( d, i ) => this.getTextX( i ) );

			this.bars = this.drawBars( this.barGroups );

			if ( hasBarLabels ) {
				this.drawBarLabels( this.barGroups );
			}

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
			const xAxisLabels = barGroups
				.append( 'text' )
				.attr( 'class', 'x-axis-labels' )
				.attr( 'x', ( d, i ) => this.getTextX( i ) )
				.attr( 'y', this.t + this.ah )
				.attr( 'text-anchor', 'middle' )
				.attr( 'dominant-baseline', 'start' )
				.style( 'font-size', '12px' )
				.text( d => d.label );


			console.log( 'xaxislabel in function', xAxisLabels );

			this.changeWithMode( {
				nodes   : xAxisLabels,
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

			const barLabelNodes = barGroups.selectAll( '.x-axis-labels' );
			const barLabelWidths = Array.from( barLabelNodes._groups[0] ).map( a => a.getBBox().height );
			const biggestBarLabel = Math.max( ...barLabelWidths );
			const spaceBetweenBarAndXAxis = 2;

			this.updateDims( {
				b : biggestBarLabel + spaceBetweenBarAndXAxis
			} );

			return xAxisLabels;
		},

		drawBars( barGroups ) {

			const bars = barGroups
				.append( 'rect' )
				.attr( 'x', ( d, i ) => this.getX( i ) )
				.attr( 'y', ( d ) => {
					const y = this.getY( this.getHeight( d.value ) );
					return y;
				} )
				.attr( 'fill', ( d ) => {
					if ( d.style === 'striped' ) {
						return 'transparent';
					}

					return d.color;
				} )
				.attr( 'stroke', ( d ) => {
					if ( d.style === 'striped' ) {
						return d.color;
					}

					return 'none';
				} )
				.attr( 'stroke-width', ( d ) => {
					if ( d.style === 'striped' ) {
						return '2';
					}

					return '0';
				} )
				.attr( 'height', d => this.getHeight( d.value ) )
				.attr( 'width', d => this.barWidth );

			// use this to make your lines render properly
			const roundToNearestMultipleOfEight = num => Math.ceil( Math.ceil( num ) / 8 ) * 8;

			barGroups
				.append( 'path' )
				.attr( 'd', ( d, i ) => {
					const x = this.getX( i ) + ( this.barWidth / 2 );

					const point1 = {
						x,
						y : Math.round( this.h - this.b ),
					};

					const point2 = {
						x,
						y : Math.min( point1.y, roundToNearestMultipleOfEight( point1.y - this.getHeight( d.value ) ) ),
					};

					return this.pathFromPoints( [point1, point2] );
				} )
				.style( 'stroke', d => d.color )
				.style( 'stroke-dasharray', ( d ) => {
					if ( d.style === 'striped' ) {
						return '2, 6';
					}

					return '';
				} )
				.style( 'stroke-width', ( d ) => {
					if ( d.style === 'striped' ) {
						return this.barWidth;
					}

					return 0;
				} );

		},

		drawBarLabels( barGroups ) {
			const barLabelGroups = barGroups
				.append( 'g' );

			const textLabels = barLabelGroups.append( 'text' )
				.attr( 'x', ( d, i ) => this.getTextX( i ) )
				.attr( 'y', ( d ) => {
					const height = this.getHeight( d.value );
					const y = this.getY( height );

					return y - ( ( this.barLabelHeight / 2 ) + this.barLabelSpacing );
				} )
				.attr( 'class', 'bar-value' )
				.attr( 'text-anchor', 'middle' )
				.attr( 'dominant-baseline', 'middle' )
				.style( 'fill', colors.white )
				.style( 'font-weight', 'bold' )
				.style( 'font-family', 'Roboto Slab' )
				.style( 'font-size', `${this.labelTextSize}px` )
				.text( d => d.value );

			const textDims = Array.from(
				textLabels._groups[0]
			).map(
				text => d3.select( text )
					.node()
					.getBBox()
			);

			const verticalPadding = 5;

			const maxTextWidth  = Math.max( ...textDims.map( dims => dims.width ) );
			const maxTextHeight = Math.max( ...textDims.map( dims => dims.height ) );

			const rectangleWidth = maxTextWidth + ( 2 * verticalPadding );
			const rectangleHeight  = maxTextHeight + ( 2 * verticalPadding );

			barGroups.append( 'rect' )
				.lower()
				.attr( 'x', ( d, i ) => this.getX( i ) + ( this.barWidth / 2 ) - ( rectangleWidth / 2 ) )
				.attr( 'width', rectangleWidth )
				.attr( 'fill', d => d.color )
				.attr( 'height', rectangleHeight )
				.attr( 'y', ( d ) => {
					const endY = this.getY( this.getHeight( d.value ) );
					const y = endY - rectangleHeight - this.barLabelSpacing;
					return y;
				} );

		},

		getTextX( i ) {
			const {
				l,
				barWidth,
				barSpacing
			} = this;

			return ( l + ( barWidth * i ) + ( barSpacing * i ) + ( barWidth / 2 ) ) + ( barSpacing / 2 );
		},

		getX( i ) {
			const {
				l,
				barWidth,
				barSpacing,
			} = this;

			return l + ( barWidth * i ) + ( barSpacing * i ) + ( barSpacing / 2 );
		},

		getY( height ) {
			const { ah, t } = this;

			return ah + t - height;
		},

		getHeight( value ) {
			const { max } = this.range;

			// + this assumes that the bottom of the range
			// + is always zero
			return ( value / max ) * this.ah;
		}

	},
};
</script>

<style lang='scss'>
.labeled-bar-chart {
	display: flex;
	flex-direction: column;
	padding: 20px;

	.title {
		align-self: flex-start;

		h1 {
			font-family: 'Roboto';
			font-style: normal;
			font-weight: bold;
			font-size: 14px;
			line-height: 16px;
			letter-spacing: 0.01em;
			text-align: left;
			margin-bottom: 5px;
		}

		h1.sub-title {
			font-size: 11px;
			line-height: 13px;
			letter-spacing: 0.04em;
			font-weight: normal;
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
