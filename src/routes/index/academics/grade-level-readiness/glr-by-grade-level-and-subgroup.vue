<route>
{
	"meta" : {
		"topbarTitle" : "GLR By Grade Level and Subgroup",
		"navOptions": {
			"title" : "By Grade Level and Subgroup",
			"icon"  : "whatever",
			"order" : 2
		}
	}
}
</route>

<template lang='pug'>
.glr-by-grade-level-and-subgroup
	data-view-state-manager(
		:state='state'
		:error-message='errorMessage'
	)
		.content.dynamic-mode-background-secondary.floating-side-text(slot='loaded' v-if='data')
			h1 GLR By Grade Level And Subgroup

			.charts-container
				ByGradeLevelChart(
					:trendChart='this.data.charts[0].data.metOrExceeding'
					:stackBarChart='this.data.charts[0].data.glr'
					:legend='this.data.charts[0].legend'
				)

			.charts-container
				BySubGroupChart(
					:chartData='this.data.charts[1].data'
					:legend='this.data.charts[0].legend'
				)


</template>

<script>
import { GetGLRByGradeLevelAndSubgroup } from '@/lib/API';
import DataViewLoader from '@/components/DataViewLoader';
import DataViewStateManager from '@/components/DataViewStateManager';
import ChangeIndicator from '@/components/charts/ChangeIndicator';
import ChartLegend from '@/components/ChartLegend';
import StackedComparisonCharts from '@/components/charts/StackedComparisonCharts';

import ByGradeLevelChart from '@/components/charts/GLR/ByGradeLevelChart';
import BySubGroupChart from '@/components/charts/GLR/BySubGroupChart';

export default {
	name : 'glr-by-grade-level-and-subgroup',

	extends : DataViewLoader,

	data : () => ( {
		fetch : GetGLRByGradeLevelAndSubgroup,
		ChangeIndicator,
	} ),

	components : {
		DataViewStateManager,
		ChartLegend,
		StackedComparisonCharts,
		ByGradeLevelChart,
		BySubGroupChart
	}
};
</script>

<style lang='scss'>
.glr-by-grade-level-and-subgroup {
	height: 100%;
	overflow: scroll;

	.data-view-state-manager,
	.data-view-state-manager .loaded-container,
	.data-view-state-manager .loaded-container .content {
		height: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;

		.page-title {
			display: flex;
			flex: 0 0 auto;
		}

		.main-title {
			font-size: 52px;
			line-height: 69px;
			letter-spacing: 0.045em;
			flex: 0 0 auto;
		}

		.chart-legend {
			flex: 0 0 auto;
		}

		.charts-container {
			width: 100%;
			height: 100%;
			flex: 1 1 0;
			padding: 30px;
		}
	}
}
</style>
