<template lang="pug">
	svg(ref='svg')
</template>

<script>
import * as d3 from 'd3';
import BaseChart from '@/components/charts/BaseChart';
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
		barLabelSpacing : 5
	} ),

	computed : {
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
			const values = data.map( d => d.value );
			const range = this.getDataRange( values, false );

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
		draw() {
			this.drawMonths( this.months );
			this.barGroups = this.createBarGroups( this.data );

			this.xAxisLabels = this.drawXAxisLabels( this.barGroups );
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

			this.changeWithMode( {
				nodes   : xAxisLabels,
				options : {
					day : {
						style : [
							['fill', colors.grey],
						]
					},
					night : {
						style : [
							['fill', colors.white]
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
