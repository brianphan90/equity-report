<template lang="pug">
	.chart
		svg(
			ref='svg'
			height='70'
			width='150'
		)
</template>

<script>
import * as d3 from 'd3';
import BaseChart from '@/components/charts/BaseChart';
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
		barLabelSpacing : 5
	} ),

	computed : {
		numOfBars() {
			// const numOfBars = Object.keys( this.item.values ).length;
			return 1;
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
		numOfBarsMonths() {
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
		this.init( this.$refs.svg, {
			t : 1,
			b : 1,
		} );
	},

	methods : {
		computeBarData( item ) {
			const {
				label,
				numOfAbsecnes
			} = this.item;

			// console.log( item.data.absences );
			/* eslint-disable */ 
			const absences  = item.data.absences;

			const colorforSolidLine = '#9E5A46';
			// temp fix passing in 100 because doing classified first

			const value = 100;

			return [{
				label,
				value,
				absences,
				numOfAbsecnes,
				colorforSolidLine,
			}];
		},
		draw() {
			// set beginning dims
			this.updateDims( {
				// h : 220,
				b : 1,
				t : 1,
			} );
			// this.drawMonths( this.months );

			// console.log( 'data', this.item );

			// format array with all needed poroperties

			const barData = this.computeBarData( this.item );

			console.log( 'barGroupsdata', barData );

			this.barGroups = this.createBarGroup( barData );

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
					numberOfIndicators         : 12,
				},
				dayColor   : colors.grey,
				nightColor : colors.white,
			} );

			this.xAxisLabels.attr( 'x', ( d, i ) => this.getTextX( i ) );
			this.bars = this.drawBars( this.barGroups );
		},

		drawMonths( months ) {
			console.log( months );
		},

		createBarGroup( barData ) {
			return this.canvas.selectAll( `bars-${this.id}` )
				.data( barData )
				.enter()
				.append( 'g' );
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
/*
			if ( totalInstruction) {
				return this.data.map( ( item ) => {
					const {
						label,
						full,
						partial,
						totalInstruction,
					} = item;
					const absences  = item.data.absences;
					const colorforSolidLine = '#9E5A46';
					return {
						label,
						full,
						partial,
						absences
					}
				} );
			} else {
				return this.data.map( ( item ) => {
					const {
						label,
						numOfAbsecnes
					} = item;

					console.log( item.data.absences );
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
			}
*/
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
