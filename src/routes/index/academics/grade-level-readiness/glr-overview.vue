<route>
{
	"meta" : {
		"topbarTitle" : "GLR Overview",
		"navOptions": {
			"title" : "Overview",
			"icon"  : "whatever",
			"order" : 1
		}
	}
}
</route>

<template lang='pug'>
.glr-overview
	h1.page-title GLR Overview
	data-view-state-manager(
		:state='state'
		:error-message='errorMessage'
	)
		.content.dynamic-mode-background-secondary.floating-side-text(slot='loaded' v-if='data')
			.main-overview
				radial-bar-chart(
					:data='data.charts.overview'
					:legend='data.charts.legend'
				)
				chart-legend(
					:legend='data.legend'
					:columns='1'
				)
			.side-bar
				.overall-glr-percent-of-students.dynamic-mode-background
					multi-bar-chart(
						:data='data.charts.overall.data'
						:title='data.charts.overall.title'
						:legend='data.charts.overall.legend'
					)
					percent-indicator(:percents='data.charts.overall.percents')
				//- .college-tracker
				//- 	college-tracker

</template>

<script>
import { GetGlrOverview } from '@/lib/API';
import DataViewLoader from '@/components/DataViewLoader';
import DataViewStateManager from '@/components/DataViewStateManager';
import RadialBarChart from '@/components/charts/RadialBarChart';
import ChartLegend from '@/components/ChartLegend';
import CollegeTracker from '@/components/charts/CollegeTracker';
import PercentIndicator from '@/components/charts/PercentIndicator';
import MultiBarChart from '@/components/charts/MultiBarChart';


export default {
	name : 'glr-overview',

	extends : DataViewLoader,

	data : () => ( {
		fetch  : GetGlrOverview,
		bValue : 0,
	} ),

	computed : {
		options() {
			return {
				maxTextLength   : 150,
				preferredBValue : this.bValue,
			};
		}
	},

	components : {
		DataViewStateManager,
		RadialBarChart,
		ChartLegend,
		CollegeTracker,
		PercentIndicator,
		MultiBarChart
	}
};
</script>

<style lang='scss'>
.glr-overview {
	height: 100%;
	display: flex;
	flex-direction: column;

	.data-view-state-manager {
		flex: 1 1 0;

		.loaded-container,
		.content {
			height: 100%;
		}
	}

	.content {
		margin: 0 20px;
		border-radius: 5px;
		padding: 40px 80px 40px 40px;
		display: flex;
		align-items: stretch;

		&::before {
			content: "GLR Achievement Levels";
			font-size: 48px !important;
		}

		.main-overview {
			flex: 2 2 0;
			display: flex;
			flex-direction: column;

			.radial-bar-chart {
				flex: 1 1 0;
			}

			.chart-legend {
				flex: 0 0 auto;
			}
		}

		.side-bar {
			flex: 1 1 0;

			.overall-glr-percent-of-students {
				min-width: 200px;
				border-radius: 10px;
				overflow: hidden;
			}
		}
	}
}
</style>
