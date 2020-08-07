<route>
{
	"meta" : {
		"topbarTitle" : "Discipline Behavior Incidents Overview",
		"navOptions": {
			"title" : "Behavior Incidents Overview",
			"icon"  : "whatever",
			"order" : 1
		}
	}
}
</route>

<template lang='pug'>
.behavior-incidents-overview
	data-view-state-manager(
		:state='state'
		:error-message='errorMessage'
	)
		.content.dynamic-mode-background-secondary.floating-side-text(slot='loaded' v-if='data')
			.page-title
				h1.main-title Discipline
				h2.sub-title Behavior Incidents
			.charts
				.subgroups
					multi-bar-chart.chart(
						:data='data.charts.byGradeLevel.data'
						:title='data.charts.byGradeLevel.title'
						:legend='data.legend'
					)
					multi-bar-chart.chart(
						:data='data.charts.bySubGroup.data'
						:title='data.charts.bySubGroup.title'
						:legend='data.legend'
					)
				.overall
					labeled-bar-chart.chart(
						:data='data.charts.overall.data'
						:title='data.charts.overall.title'
						:legend='data.legend'
						:options='options'
					)
</template>

<script>
import { GetBehaviorIncidentsOverview } from '@/lib/API';
import DataViewLoader from '@/components/DataViewLoader';
import DataViewStateManager from '@/components/DataViewStateManager';
import MultiBarChart from '@/components/charts/MultiBarChart';
import LabeledBarChart from '@/components/charts/LabeledBarChart';

export default {
	name : 'behavior-incidents-overview',

	extends : DataViewLoader,

	data : () => ( {
		fetch   : GetBehaviorIncidentsOverview,
		options : {
			hasBarLabels       : true,
			numberOfIndicators : 7
		}
	} ),

	components : {
		DataViewStateManager,
		MultiBarChart,
		LabeledBarChart
	}
};
</script>

<style lang='scss'>
	.behavior-incidents-overview {
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
			padding: 20px;
			border-radius: 5px;
			position: relative;
			height: 100%;
			display: flex;
			flex-direction: column;

			.page-title {
				display: flex;
				margin-left: 10px;

				h1.main-title {
					color: #9E5B46 !important;
					font-size: 52px;
					line-height: 69px;
					letter-spacing: 0.045em;
				}

				h2.sub-title {
					color :#9E5B46 !important;
					font-size: 52px;
					line-height: 69px;
				}
			}

			.charts {
				display: flex;
				overflow: auto;
				flex: 1 1 0;

				.subgroups {
					flex : 2 1 auto;
					display: flex;
					flex-direction: column;
				}

				.overall {
					flex: 1 2 225px;
					display: flex;
				}

				.multi-bar-chart {
					flex: 1 1 auto;
					margin: 10px;
					border-radius: 10px;
				}

				.labeled-bar-chart {
					border-radius: 10px;
					margin: 10px;
				}

			}
		}
	}
</style>
