<template lang="pug">
	.ByGradeLevelChart
		.trendChart
			TrendChart(
				:currentYear='this.trendChart.currentYear'
				:priorYear='this.trendChart.priorYear'
			)
		.stackedBarChart
			StackBarChart(
				:chartData='this.stackBarChart'
				:currentYear='this.trendChart.currentYear'
				:legend='this.legend'
			)
</template>

<script>
import BottomLine from '@/components/charts/GLR/components/BottomLine';
import StackBarChart from '@/components/charts/GLR/components/StackBarChart';
import TrendChart from '@/components/charts/GLR/components/TrendChart';


export default {
	name : 'GLRByGradeLevelChart',

	components : {
		BottomLine,
		StackBarChart,
		TrendChart
	},


	props : {
		trendChart : {
			type : Object,
		},
		stackBarChart : {
			type : Array,
		},
		legend : {
			type : Object,
		}
	},

	data : () => ( {

	} ),


	methods : {
	}


};
</script>

<style lang="scss">
.ByGradeLevelChart {
}
</style>
