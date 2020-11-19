<template lang="pug">
	.chart
		svg(ref='svg')
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
		data : {
			type    : Array,
			default : () => ( [] )
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
		barWidth() {
			const { aw, data } = this;
			return Math.min( aw / data.length, 25 );
		},
		barSpacing() {
			const { barWidth, data, aw } = this;
			const barSpacing = ( aw - ( barWidth * data.length ) ) / data.length;
			console.log( aw );
			return 15;
		},
		numOfBars() {
			return 12;
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
		range() {
			const { data } = this;
			const values = data.map( d => d.numOfAbsecnes );
			// console.log( values );
			const range = this.getDataRange( values, false );
			console.log( range );
			return {
				min : range.start,
				max : range.end
			};
		},
	},

	mounted() {
		this.init( this.$refs.svg );
	},

	methods : {
		computeBarData() {

			return this.data.map( ( item ) => {
				const {
					label,
					// remove this when certified is added
					// value,
					numOfAbsecnes
				} = item;

				console.log( item.data.absences );
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
				};
			} );
		},
		draw() {
			// set beginning dims
			this.updateDims( {
				
				l : 50,
				r : 5,
				t : 10
			} );
			// this.drawMonths( this.months );

			console.log( 'data', this.data );

			// format array with all needed poroperties

			const barGroupsData = this.computeBarData();

			console.log( 'barGroupsdata', barGroupsData );

			this.barGroups = this.createBarGroups( barGroupsData );

			console.log( 'bargroups', this.barGroups );

			this.xAxisLabels = this.drawXAxisLabels( this.barGroups );
			
			console.log( 'xAxisLabels', this.xAxisLabels );
			// draw labels
			
			// this.yAxisLabels = this.drawYAxisLabels( this.barGroups );
			// console.log( 'yAxisLabels', this.yAxisLabels );	

			const lineIndicators = this.drawAxisIndicators( {
				range    : this.range,
				axis     : 'y',
				postChar : '',
				lines    : {
					spaceBetweenLabelsAndLines : 20,
					numberOfIndicators         : 12,
				},
				dayColor   : colors.grey,
				nightColor : colors.white, 
				data : this.data
			} );

			this.xAxisLabels.attr( 'x', ( d, i ) => this.getTextX( i ) );
		},

		drawMonths( months ) {
			console.log( months );
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


			console.log( 'drawxaxislabels in function', xAxisLabels );

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
		getTextX( i ) {
			const {
				l,
				barWidth,
				barSpacing
			} = this;

			return ( l + ( barWidth * i ) + ( barSpacing * i ) + ( barWidth / 2 ) ) + ( barSpacing / 2 );
		},

	}
};
</script>

<style lang='scss'>
	.chart {
		width: 100%;
		height: 100%;
		flex: 1 1 0;

		svg {
			width: 100%;
			height: 1%;
		}
	}

</style>