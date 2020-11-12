<route>
{
	"meta" : {
		"topbarTitle" : "Staff Classified Attendance Disaggregated",
		"navOptions": {
			"title" : "Classified Attendance Disaggregated",
			"icon"  : "whatever",
			"order" : 4
		}
	}
}
</route>

<template lang='pug'>
.classified-attendance-disaggregated
	data-view-state-manager(
		:state='state'
		:error-message='errorMessage'
	)
		.content.dynamic-mode-background-secondary.floating-side-text(slot='loaded' v-if='data')
			.page-title
				h1.main-title.dynamic-mode-text Classified Attendance
			.chart
				chart-legend(:legend="data.legend")
			.charts-container.dynamic-mode-background-opaque
				stacked-comparison-charts(
					v-for='chart in data.charts'
					:data='chart'
				)
</template>

<script>
import { GetClassifiedAttendanceDisaggregated } from '@/lib/API';
import DataViewLoader from '@/components/DataViewLoader';
import DataViewStateManager from '@/components/DataViewStateManager';
import SimpleStackedBarChart from '@/components/charts/SimpleStackedBarChart';
import DisaggregatedGraphicWrapper from '@/components/charts/DisaggregatedGraphicWrapper';
import ChangeIndicator from '@/components/charts/ChangeIndicator';
import ChartLegend from '@/components/ChartLegend';
import StackedComparisonCharts from '@/components/charts/StackedComparisonCharts';

export default {
	name : 'classified-attendance-disaggregated',

	extends : DataViewLoader,

	data : () => ( {
		fetch : GetClassifiedAttendanceDisaggregated,
		ChangeIndicator,
		SimpleStackedBarChart,
	} ),

	components : {
		DataViewStateManager,
		DisaggregatedGraphicWrapper,
		ChartLegend,
		StackedComparisonCharts,
	}
};
</script>

<style lang='scss'>
.classified-attendance-overview {
	height: 100%;
	display: flex;

	.content {
		.page-title {
			display: flex;

			.main-title {
					font-size: 52px;
					line-height: 69px;
					letter-spacing: 0.045em;
			}
		}
	}

	.charts {
		display: flex;
		flex: 1 1 0;
		margin-top: 15px;
		.chart {
			flex: 1 1 0;
			height: 100%;
		}
	}
}
</style>
