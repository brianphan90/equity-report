<route>
{
	"meta" : {
		"topbarTitle" : "Staff Certificated Attendance Disaggregated",
		"navOptions": {
			"title" : "Certificated Attendance Disaggregated",
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
			.page-header
				.title
					h1 CAASPP By Grade Level And Subgroup
			.chart
				chart-legend(:legend='data.legend')
			.charts-container.dynamic-mode-background-opaque
				stacked-comparison-charts(
					v-for='chart in data.charts'
					:data='chart'
				)
</template>

<script>
import { GetCertificatedAttendanceDisaggregated } from '@/lib/API';
import DataViewLoader from '@/components/DataViewLoader';
import DataViewStateManager from '@/components/DataViewStateManager';
import SimpleStackedBarChart from '@/components/charts/SimpleStackedBarChart';
import DisaggregatedGraphicWrapper from '@/components/charts/DisaggregatedGraphicWrapper';
import ChangeIndicator from '@/components/charts/ChangeIndicator';
import ChartLegend from '@/components/ChartLegend';
import StackedComparisonCharts from '@/components/charts/StackedComparisonCharts';

export default {
	name : 'certificated-attendance-disaggregated',

	extends : DataViewLoader,

	data : () => ( {
		fetch : GetCertificatedAttendanceDisaggregated,
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
