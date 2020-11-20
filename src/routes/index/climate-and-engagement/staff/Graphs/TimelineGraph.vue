<template lang="pug">
	.chart
		svg(
			ref='svg'
			height='1000'
			width='200'
		)
</template>

<script>
import * as d3 from 'd3';
import BaseChart from '@/components/charts/BaseChart';
import HorizontalStripedBarChart from '@/components/charts/HorizontalStripedBarChart';
import colors from '@/assets/js/colors';

export default {
	name : 'TimelineGraph',

	extends : BaseChart,

	props : {
		item : {
			type    : Object,
			default : () => ( {} )
		}
	},

	data : () => ( {
		axisIndicators  : null,
		barGroups       : null,
		xAxisLabels     : null,
		yAxisLabels     : null,
		barLabelSpacing : 5
	} ),

	computed : {
		numOfBars() {
			// const numOfBars = Object.keys( this.item.values ).length;
			return 12;
		},
		maxBarWidth() {
			const { aw, numOfBars, defaultPadding } = this;

			const maxBarWidth = aw / numOfBars;

			return maxBarWidth;
		},
		barWidth() {
			const { maxBarWidth } = this;
			return Math.min( maxBarWidth, 25 );
		},
		barSpacing() {
			// const { barWidth, data, aw } = this;
			// const barSpacing = ( aw - ( barWidth * data.length ) ) / data.length;
			// console.log( barSpacing );

			return 8;
		},
		months() {
			return [
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
			];
		},
	},

	mounted() {
		this.init( this.$refs.svg, {
			t : 1,
			b : 1
		} );
	},

	methods : {
		computeBarData( data ) {
			// we are passing array but we have to check two cases to check if it comes from certificated or classified
			/* eslint-disable */
			const totalInstruction = data[0].totalInstruction;
			if ( totalInstruction ) {
				return data.map( ( item ) => {
					const {
						label,
						full, 
						partial, 
						totalInstruction,
					} = item; 
					
					/* eslint-disable */ 
					const absences = item.data.absences;
					const value = 100;
					const colorforSolidLine = '#9E5A46';
					return {
						label,
						value,
						absences,
						full,
						partial,
						totalInstruction,
						colorforSolidLine
					}
				})
			} else {
				return data.map( ( item ) => {
					const {
						label,
						numOfAbsecnes
					} = item;
					/* eslint-disable */ 
					const absences  = item.data.absences;

					const colorforSolidLine = '#9E5A46';
					// temp fix passing in 100 because doing classified first

					const value = 100;

					return {
						label,
						value,
						absences,
						numOfAbsecnes,
						colorforSolidLine,
					}
				} );
			}
		},
		draw() {
			// this.drawMonths( this.months );

			// format array with all needed poroperties

			const barData = this.computeBarData( this.data );

			this.barData = barData;

			console.log( 'barGroupsdata', barData );

			this.barGroups = this.createBarGroup( barData );

			this.xAxisLabels = this.drawXAxisLabels( this.barGroups );
			//draws y axis without indicator lines

			// draw the bars
			// this.drawBars ( this.barGroups );

			const lineIndicators = this.drawAxisIndicators( {
				range    : this.range,
				axis     : 'y',
				postChar : '',
				lines    : {
					spaceBetweenLabelsAndLines : 5,
					numberOfIndicators         : this.data.length,
				},
				dayColor   : colors.grey,
				nightColor : colors.white,
				data: this.data,
			} );
			
			


			// draw labels
			
			// this.yAxisLabels = this.drawYAxisLabels( this.barGroups );
			// console.log( 'yAxisLabels', this.yAxisLabels );	
			
			

		},

		drawAxisIndicators( options ) {
			const {
				axis, // eslint-disable-line
				range,
				lines,
				postChar,
				nightColor,
				dayColor,
				data
			} = options;

			const color = ( this.mode === 'night' ? nightColor : dayColor );

			const {
				numberOfIndicators,
				spaceBetweenLabelsAndLines,
			} = lines;

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
					const bottomOfChart = this.t + this.ah;
					console.log(bottomOfChart);
					const distanceFromBottom = i * ( this.ah / ( numberOfIndicators - 1 ) );
					console.log( distanceFromBottom );
					return bottomOfChart - distanceFromBottom;
				} )();

				const textValue = this.data[Object.keys( this.data )[i]].label;;

				labelData.push( {
					y,
					text : `${textValue}${postChar || ''}`,
					dominantBaseline,
					nightColor,
					dayColor,
				} );

			}

			const lineIndicatorGroups = this.canvas
				.selectAll( `line-indicators-${this.id}` )
				.data( labelData )
				.enter()
				.append( 'g' ) // will append as many g's as the length of labelData
				.attr( 'class', `line-indicators-${this.id}` );

			

			if ( options.labels !== false ) {
				/* draw line lables */
				const lineLabels = lineIndicatorGroups.append( 'text' )
					.attr( 'class', `line-indicators label-${this.id} dynamic-text-${this.id}` )
					.attr( 'dominant-baseline', d => d.dominantBaseline )
					.attr( 'x', this.l )
					.attr( 'y', d => d.y + 75 )
					.style( 'font-size', '10px' )
					.style( 'fill', color )
					.text( d => d.text );


				/* right align text */

				/*
				const lineLabelWidths  = Array.from( lineLabels._groups[0] ).map( a => a.getBBox().width );
				const biggestLineLabel = Math.max( ...lineLabelWidths );

				lineLabels.attr( 'x', biggestLineLabel )
					.attr( 'text-anchor', 'end' );


				this.updateDims( {
					l : biggestLineLabel + spaceBetweenLabelsAndLines
				} );
				*/ 
			}
			const bars = this.barGroups.selectAll( `bar-groups-${this.id}` )
				.data( this.barData )
				.enter()
				.append( 'g' );

			bars.append( 'rect' )
				.attr( 'x', ( d, i ) => this.getX( i ) + 50  )
				.attr( 'y', ( d ) => {
					const y = this.getY( this.getHeight( d.value ) );
					console.log( 'y in', y );
					return y;
				} )
				.attr( 'width', 200 )
				.attr( 'fill', '#9E5A46' )
				.attr( 'height', 10 );

			return lineIndicatorGroups;

		},

		createBarGroup( barData ) {
			return this.canvas.selectAll( `bars-${this.id}` )
				.data( barData )
				.enter()
				.append( 'g' );
		},

		drawBars( barGroups ) {


			this.barLabelGroups = barGroups
				.append( 'g' );

			const spaceBetweenLabelAndBar = 2;

			this.barLabelGroups.append( 'rect' )
				.attr( 'x', 45 )
				.attr( 'y', 50 )
				.attr( 'width', 540 )
				.attr( 'fill', '#9E5A46' )
				.attr( 'height', 10 );

			// this function needs to be alter'd to draw triangles, circles on graph
			const textLabels = this.barLabelGroups.append( 'text' )
				.attr( 'x', 500 )
				.attr( 'y', 70 )
				// .attr( 'class', 'bar-value' )
				.attr( 'text-anchor', 'middle' )
				.attr( 'dominant-baseline', 'middle' )
				.style( 'fill', colors.black )
				.text( 'number of absences: ' );

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

	}
};
</script>

<style lang='scss'>
	.chart {
		width: 100%;
		flex: 1 1 0;

		svg {
			width: 100%;
			height: 1000;
		}
	}

</style>
