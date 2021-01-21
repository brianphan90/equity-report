<template lang="pug">
    .comparisonChart
        svg(ref='svg')

</template>
<style lang="scss">

    .comparisonChart {
        border: 1px solid red;
        height: 500px;
        width : 75%;
        svg{
        position: relative;
        height: 100%;
        width : 100%;
        border: 1px solid green;
    }
    }
</style>
<script>
import colors from '@/assets/js/colors';
import ChartLegend from '@/components/ChartLegend';
import BaseChart from '@/components/charts/BaseChart';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

export default {
	name    : 'BStackedComparisonChart',
	extends : BaseChart,

	props : {
		title : {
			type : String
		},

		options : {
			type    : Object,
			default : () => ( {
				maxTextLength : 150,
				barSpacing    : 2,
				groupSpacing  : 7
			} )
		},
		data : {
			type    : Object,
			default : () => ( {
				byGradeLevel : {
					type : 'overUnderChart',
					data : [{
						label    : '3',
						negative : {
							currentYear : 51.78,
							priorYear   : 30
						},
						positive : {
							currentYear : 48.21,
							priorYear   : 70
						}
					},
					{
						label    : '4',
						negative : {
							currentYear : 57.14,
							priorYear   : 50
						},
						positive : {
							currentYear : 42.86,
							priorYear   : 50
						}
					},
					{
						label    : '5',
						negative : {
							currentYear : 59.79,
							priorYear   : 50
						},
						positive : {
							currentYear : 40.2,
							priorYear   : 50
						}
					},
					{
						label    : '6',
						negative : {
							currentYear : 70.1,
							priorYear   : 50
						},
						positive : {
							currentYear : 29.91,
							priorYear   : 50
						}
					},
					{
						label    : '7',
						negative : {
							currentYear : 70.1,
							priorYear   : 73
						},
						positive : {
							currentYear : 29.91,
							priorYear   : 50
						}
					},
					{
						label    : '8',
						negative : {
							currentYear : 70.1,
							priorYear   : 50
						},
						positive : {
							currentYear : 29.91,
							priorYear   : 50
						}
					},
					{
						label    : '9',
						negative : {
							currentYear : 70.1,
							priorYear   : 50
						},
						positive : {
							currentYear : 29.91,
							priorYear   : 50
						}
					}
					]
				}
			} )
		},
		legend : {
			type    : Object,
			default : () => ( {
				negative : {
					currentYear : { color : '#BE8674' }
				},
				positive : {
					currentYear : { color : '#D7B6AA' }
				}
			} )
		}
	},
	data : () => ( {
		xAxisLabels : null,
		barGroups   : null,
		bars        : null
	} ),
	computed : {
		getPositiveValues() {
			return this.data.byGradeLevel.data.map( entry => entry.positive );
		},
		getNegativeValues() {
			return this.data.byGradeLevel.data.map( entry => entry.negative );
		},

		mode() {
			return this.$store.state.user.mode;
		},
	},

	mounted() {
		this.init( this.$refs.svg );
	},
	methods : {
		draw() {
			this.updateDims( {

			} );
			// draw y-axis
			const yOptions = {
				axis  : 'y-right',
				range : {
					min : 0,
					max : 100
				},
				lines : {
					numberOfIndicators         : 5,
					spaceBetweenLabelsAndLines : 10,
				},
			};
			const xAxisData = {
				axis                       : 'x-bottom',
				values                     : this.data.byGradeLevel.data,
				spaceBetweenLabelsAndChart : 0,

			};
			// draw x-axis boxes
			const xBoxesData = this.drawXAxisIndicators( xAxisData );
			const fLines = {
				start : this.t,
				end   : xBoxesData[0].y
			};
			const sLines = {
				start : xBoxesData[0].y + xBoxesData[0].height,
				end   : xBoxesData[0].y
			};

			this.drawYAxisIndicators( fLines, yOptions );
			this.drawYAxisIndicators( sLines, yOptions );
			// const posVals = this.getPositiveValues();
			const posData = this.computePositiveBarData( this.getPositiveValues, xBoxesData );
			const negData = this.computeNegativeBarData( this.getNegativeValues, xBoxesData );
			this.drawBars( posData );
			this.drawBars( negData );
			// this.drawBars();
			// this.drawYAxisIndicators( xBoxesData, yOptions );

		},
		computePositiveBarData( barData, boxData ) {
			const finalData = [barData.length * 2];
			const sum = 100;
			barData.forEach( ( entry, i ) => {
				const curYear = entry.currentYear;
				const priYear = entry.priorYear;
				const curHeight = curYear / sum * boxData[i].y;
				const priHeight = priYear / sum * boxData[i].y;
				const curY = this.t + ( boxData[i].y - curHeight );
				const priY = this.t + ( boxData[i].y - priHeight );
				const width = boxData[i].width / 5;
				finalData.push( {
					width  : boxData[i].width / 5,
					x      : boxData[i].x + width,
					y      : curY,
					height : curHeight,
					color  : '#94AEB4'
				} );
				finalData.push( {
					width  : boxData[i].width / 5,
					color  : '#557176',
					x      : boxData[i].x + width * 3,
					y      : priY,
					height : priHeight,
				} );
			} );
			return finalData;
		},
		computeNegativeBarData( barData, boxData ) {
			const finalData = [barData.length * 2];
			const sum = 100;
			barData.forEach( ( entry, i ) => {
				const curYear = entry.currentYear;
				const priYear = entry.priorYear;
				const curHeight = curYear / sum * ( this.ah - ( boxData[i].y + boxData[i].height ) );
				const priHeight = priYear / sum * ( this.ah - ( boxData[i].y + boxData[i].height ) );
				const curY = this.t + boxData[i].y + boxData[i].height;
				const priY = this.t + boxData[i].y + boxData[i].height;
				const width = boxData[i].width / 5;
				finalData.push( {
					width  : boxData[i].width / 5,
					color  : '#D7B6AA',
					x      : boxData[i].x + width,
					y      : curY,
					height : curHeight,
				} );
				finalData.push( {
					width  : boxData[i].width / 5,
					color  : '#BE8674',
					x      : boxData[i].x + width * 3,
					y      : priY,
					height : priHeight,
				} );
			} );
			return finalData;
		},
		drawBars( barData ) {
			const barGroups = this.canvas.selectAll( `bars-${this.id}` )
				.data( barData )
				.enter()
				.append( 'g' );
			barGroups
				.append( 'rect' )
				.attr( 'x', d => d.x )
				.attr( 'y', d => d.y )
				.attr( 'height', d => d.height )
				.attr( 'width', d => d.width )
				.attr( 'opacity', 0.8 )
				.attr( 'fill', d => d.color );
		},
		drawXAxisIndicators( options ) {
			const {
				axis,
				values,
				spaceBetweenLabelsAndChart,
				labelStyle,
			} = options;
			const getX = ( i ) => {
				const { aw, l } = this;

				return l + ( ( aw / ( values.length + 1 ) ) * ( i + 1 ) );
			};
			const xAxisData = values.map( ( datum, i ) => {
				const y = () => ( ( axis === 'x-top' ) ? this.t : ( this.t + this.ah ) / 2 );
				const x = () => getX( i );
				return {
					...datum,
					x,
					y,
					textAnchor       : 'middle',
					dominantBaseline : ( axis === 'x-top' ) ? 'text-before-edge' : 'text-after-edge',
				};

			} );
			const xAxisLabels = this.canvas
				.selectAll( 'x-axis-labels axis-label' )
				.data( xAxisData )
				.enter()
				.append( 'text' )
				.attr( 'text-anchor', d => d.textAnchor )
				.attr( 'x', d => d.x() )
				.attr( 'y', d => d.y() )
				.attr( 'dominant-baseline', d => d.dominantBaseline )
				.style( 'fill', d => d.color )
				.text( d => d.label );


			if ( labelStyle ) {
				this.applyMethods( xAxisLabels, 'style', labelStyle );
			}
			const verticalPadding = 5;
			const xAxisLabelDims    = Array.from( xAxisLabels._groups[0] ).map( a => a.getBBox() );
			const xAxisLabelHeights = xAxisLabelDims.map( a => a.height );
			const xAxisLabelWidths  = xAxisLabelDims.map( a => a.width );
			const biggestXAxisLabelHeight = Math.max( ...xAxisLabelHeights );
			const biggestXAxisLabelWidth = Math.max( ...xAxisLabelWidths );
			const rectHeight = biggestXAxisLabelHeight + ( 7 * verticalPadding );
			const rectWidth = biggestXAxisLabelWidth + ( 15 * verticalPadding );
			console.log( xAxisLabelDims );
			const dims = ( () => {
				if ( axis === 'y-top' ) {
					return {
						t : biggestXAxisLabelHeight + spaceBetweenLabelsAndChart,
					};
				}

				return {
					b : biggestXAxisLabelHeight + spaceBetweenLabelsAndChart + rectHeight,
				};
			} )();

			this.updateDims( dims );
			this.realignAxisLabels();

			const barLabelGroup = this.canvas.selectAll( 'boxLabels' )
				.data( xAxisLabelDims )
				.enter()
				.append( 'rect' )
				.attr( 'x', ( d, i ) => getX( i ) - ( rectWidth / 2 ) )
				.attr( 'y', d => ( this.t + this.ah ) / 2 ) // middle
				.attr( 'fill', '#E4E4E4' )
				.attr( 'opacity', 0.8 )
				.attr( 'height', rectHeight )
				.attr( 'stroke', 'black' )
				.attr( 'stroke-width', 2 )
				.attr( 'width', rectWidth );

			// console.log( barLabelGroup );
			// ? center texts as necessary
			// const totalTextSpace = xAxisLabelWidths.reduce( ( sum, w ) => sum + w, 0 );
			// const leftOverSpace  = this.aw - totalTextSpace;
			// const spaceAround    = ( leftOverSpace / ( values.length + 1 ) );
			const barLabelDims = barLabelGroup._groups[0].map( entry => entry.getBBox() );
			console.log( barLabelDims );
			return barLabelDims;
			// return xAxisData;


		},

		drawYAxisIndicators( boxData, options ) {
			const {
				axis,
				range,
				lines,
				postChar,
				color,
				transformLabel,
			} = options;
			const {
				start,
				end
			} = boxData;
			const {
				numberOfIndicators,
				spaceBetweenLabelsAndLines,
			} = lines;
			// const firstEnd = boxData[0].y;
			// const secondStart = boxData[0].y - boxData[0].height;
			// const thirdTry = boxData[0].y + boxData[0].height;
			/* draw initial lines and indicators */
			const rangeDifference = range.max - range.min;
			/* add text labels */
			const labelData = [];
			for ( let i = 0; i < numberOfIndicators; i++ ) {

				const dominantBaseline = ( () => {
					if ( i === numberOfIndicators - 1 ) {
						return 'text-before-edge';
					}

					if ( i === 0 ) {
						return 'text-after-edge';
					}

					return 'middle';
				} )();

				const y = ( () => {
					// const bottomOfChart = this.t + firstEnd;
					// const bottomOfChart = this.t + this.ah;
					const bottomOfChart = start + end;
					const distanceFromBottom = i * ( end / ( numberOfIndicators - 1 ) );
					// const bottomOfChart      = this.t + this.ah;
					// const distanceFromBottom = i * ( secondStart / ( numberOfIndicators - 1 ) );
					// const firstHalf  = this.t + boxData[0].y;
					// distanceFromBottom = i * (boxData[0].y / (numberOfIndicators -1 ))
					// const secondHalf = this.t + this
					return bottomOfChart - distanceFromBottom;
				} );

				const x     = () => ( ( axis === 'y-right' ) ? this.w - this.r : this.l );
				const x2    = () => ( ( axis === 'y-right' ) ? x() - this.aw : x() + this.aw );
				const pathX = () => ( ( axis === 'y-right' ) ? x() - spaceBetweenLabelsAndLines : x() + spaceBetweenLabelsAndLines );
				const textValue = Math.round( range.min + ( ( i / ( numberOfIndicators - 1 ) ) * rangeDifference ) );
				const label     = transformLabel ? transformLabel( textValue ) : textValue;
				const textAnchor = ( axis === 'y-right' ? 'start' : 'end' );

				labelData.push( {
					x,
					x2,
					y,
					y2   : y,
					text : `${label}${postChar || ''}`,
					path : () => `M ${pathX()}, ${y()} L ${x2()}, ${y()}`,
					dominantBaseline,
					textAnchor,
					color,
				} );

			}
			// labelData.forEach( console.log( entry => pathX() ) );
			const lineIndicatorGroups = this.canvas
				.selectAll( `line-indicators-${this.id}` )
				.data( labelData )
				.enter()
				.append( 'g' ) // will append as many g's as the length of labelData
				.attr( 'class', `line-indicators-${this.id}` );

			if ( options.labels !== false ) {

				/* draw line lables */
				const lineLabels = lineIndicatorGroups.append( 'text' )
					.attr( 'class', `line-indicators label-${this.id} axis-labels dynamic-text-${this.id}` )
					.attr( 'dominant-baseline', d => d.dominantBaseline )
					.attr( 'x', d => d.x() )
					.attr( 'y', d => d.y() )
					.style( 'font-size', '12px' )
					.style( 'fill', color )
					.text( d => d.text )
					.attr( 'text-anchor', d => d.textAnchor );

				/* right align text */

				const lineLabelWidths  = Array.from( lineLabels._groups[0] ).map( a => a.getBBox().width );
				const biggestLineLabel = Math.max( ...lineLabelWidths );

				const dims = ( () => {
					const newWidth = ( biggestLineLabel + spaceBetweenLabelsAndLines );

					if ( axis === 'y-right' ) {
						return {
							r : newWidth,
						};
					}

					return {
						l : newWidth,
					};
				} )();

				this.updateDims( dims );
				this.realignAxisLabels();

			}

			/* draw lines */
			lineIndicatorGroups.append( 'path' )
				.attr( 'd', d => d.path() )
				.attr( 'class', `dynamic-stroke-${this.id} axis-indicators` )
				.attr( 'opacity', '0.7' )
				.style( 'stroke-dasharray', '2, 4' )
				.style( 'stroke', 'grey' );


			return lineIndicatorGroups;

		},


	}
};
</script>
