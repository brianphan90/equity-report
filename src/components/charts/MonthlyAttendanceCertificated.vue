<template lang="pug">
.monthly-attendance-chart
    svg(:id='id' ref='svg')
</template>

<script>
// this component will probably be 80% of  MonthlyAttendance
import * as d3 from 'd3';
import colors from '@/assets/js/colors';
import BaseChart from './BaseChart';

export default {
	name    : 'monthly-attendance-chart-certificated',
	extends : BaseChart,

	props : {
		data : {
			type : Array
		},
	},
	data : () => ( {
		monthlyDims : {
			w  : 0,
			h  : 0,
			l  : 0,
			r  : 0,
			b  : 0,
			t  : 0,
			aw : 0,
			ah : 0,
		},

		leftLabelFontSize    : 16,
		barHeight            : 18,
		barIndicatorFontSize : 10,

		timelineHeight : 50,
	} ),

	mounted() {
		this.init( this.$refs.svg );
	},

	computed : {

	},
	methods : {
		draw() {
			console.log( this.canvas );
		}
	}
};
</script>
