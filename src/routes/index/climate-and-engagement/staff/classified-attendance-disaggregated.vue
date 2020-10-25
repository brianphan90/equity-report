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
.glr-by-grade-level-and-subgroup
	h1 Classified Attendance Dissagregated
	data-view-state-manager(
		:state='state'
		:error-message='errorMessage'
	)
		.content.dynamic-mode-background-secondary.floating-side-text(slot='loaded' v-if='data')
			.page-header
				.title
					//- h1.dynamic-mode-text Grade Level Readiness
					//- h1.subtitle.dynamic-mode-text By Grade Level and Subgroup
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
</style>
