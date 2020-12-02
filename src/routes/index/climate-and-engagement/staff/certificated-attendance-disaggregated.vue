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
.certificated-attendance-disaggregated
	data-view-state-manager(
		:state='state'
		:error-message='errorMessage'
	)
		.content.dynamic-mode-background.floating-side-text(slot='loaded' v-if='data')
			.page-title
				h1.dynamic-mode-text Teacher
				h1.subtitle.dynamic-mode-text Attendance
			.chart-legend
				chart-legend(:legend='data.legend' :columns=1 )
			.attendance-chart
				attendance-disaggregate-wrapper(
					:legend='data.legend'
					:chart='data.chart'
					:origin='this.origin'
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


import AttendanceDisaggregateWrapper from '@/components/charts/AttendanceDisaggregateWrapper';

export default {
	name : 'certificated-attendance-disaggregated',

	extends : DataViewLoader,

	data : () => ( {
		fetch : GetCertificatedAttendanceDisaggregated,
		ChangeIndicator,
		SimpleStackedBarChart,

		origin : 'certificated'
	} ),


	components : {
		DataViewStateManager,
		DisaggregatedGraphicWrapper,
		ChartLegend,
		StackedComparisonCharts,
		AttendanceDisaggregateWrapper
	}
};
</script>

<style lang='scss'>
.certificated-attendance-disaggregated {
	height: 100%;
	overflow: scroll;
	.content {
		.page-title {
			display: flex;
		}
		.main-title {
			font-size: 52px;
			line-height: 69px;
			letter-spacing: 0.045em;
		}
		.attendance-chart {
			width: 100%;
			height: 100%;
			flex: 1 1 0;
			padding: 30px;
		}
	}
}
</style>
