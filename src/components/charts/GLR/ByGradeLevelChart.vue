<template lang="pug">
	.ByGradeLevelChart
		.legend
			Legend(
				:legend='this.legend'
				:legendInfo='this.legendInfo'
			)
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

import Legend from '@/components/charts/GLR/components/Legend';

export default {
	name : 'GLRByGradeLevelChart',

	components : {
		BottomLine,
		StackBarChart,
		TrendChart,
		Legend
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
		legendInfo : {
			title      : 'By Grade Level',
			paragraphs : [
				'TOP: Percent of students who are grade-level ready or exceeding grade-level expectations',
				'BOTTOM: Percent of students within each of the five GLR achievement bands over 2-years.'
			]
		}
	} ),


	methods : {
	}


};
</script>

<style lang="scss">
.ByGradeLevelChart {
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	padding: 16px;
	text-align: center;

	.legend {

		padding-bottom: 50px;
	}
}
</style>
