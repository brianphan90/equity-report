<template lang='pug'>
.left-chart
    svg(:id='id')
        MonthLegend(
            :svg='svg'
            :dims='monthlyDims'
        )
        TimelineGraph(
            v-for='(item, i) in data'
            :dims='getDims(i)'
            :svg='svg'
            :item='item'
            :key="item.label"
        )
</template>

<script>
import BaseChart from './BaseChart';
import MonthLegend from './MonthLegend';
import TimelineGraph from './TimelineGraph';

export default {
	name    : 'monthly-attendance-chart',
	extends : BaseChart,

	props : {
		data : {
			type : Array,
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
	} ),
	computed : {
		svg() {
			return this.$refs.svg;
		},
	},

	methods : {
		getDims( i ) {
		},
	},
	components : {
		MonthLegend,
		TimelineGraph,
	}
};
</script>
