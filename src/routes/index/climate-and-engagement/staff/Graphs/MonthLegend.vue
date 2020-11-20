<template lang="pug">
.months
        svg(
            ref='svg'
			height='65'
			width='600'
        )
</template>

<script>
import * as d3 from 'd3';
import BaseChart from '@/components/charts/BaseChart';
import colors from '@/assets/js/colors';

export default {
	name    : 'MonthLegend',
	extends : BaseChart,

	mounted() {
		this.init( this.$refs.svg );
	},

	computed : {
		months() {
			return ['July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June'];
		}
	},

	methods : {
		draw() {
			const xScale = d3.scaleBand()
				.range( [0, this.aw] )
				.domain( this.months );

			const monthGroups = this.createMonthGroups( this.months );

			monthGroups
				.attr( 'transform', 'rotate(-90 0 5)' )
				.call( d3.axisLeft( xScale ) );

		},
		createMonthGroups( data ) {
			return this.canvas
				.selectAll( '.month-groups' )
				.data( data )
				.enter()
				.append( 'g' )
				.attr( 'class', 'bar-groups' );
		}
	}
};
</script>
