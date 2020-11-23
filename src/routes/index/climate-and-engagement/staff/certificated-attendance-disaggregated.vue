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
		.content.dynamic-mode-background-secondary.floating-side-text(slot='loaded' v-if='data')
			.page-header
				.title
					h1.dynamic-mode-text Teacher
					h1.subtitle.dynamic-mode-text Attendance
				.legend
					chart-legend(:legend='data.legend' :columns=1 )
			.charts
				attendance-disaggregate-wrapper(
					:legend='data.legend'
					:chart='data.chart'
				)
</template>

<script>
/*
			.charts
				.left-chart
f					.data-grid
						.month-legend
							table
								thead
									tr(v-for="(entry,i) in months" :key="i")
										th
										td {{ entry }}
						.teacher-info
							table.table-mt-5
								thead
								tbody
									tr(v-for="(entry, i) in firstHalfDataChart" :key="i")
										th(scope="row")
										td {{ entry.label }}
										td {{ entry.numOfAbsecnes}}
							pure-vue-chart(
								:points="firstHalfBarGraph"
								:width="500"
								:height="200"
								:show-values="true"
							)
				.right-chart
					.data-grid
						.month-legend
							table
								thead
									tr(v-for="(entry,i) in months" :key="1")
										th
										td {{ entry }}
						.teacher-info
							table.table-mt-5
								thead
								tbody
									tr(v-for="(entry, i) in secondHalfDataChart" :key="i")
										th(scope="row")
										td {{ entry.label }}
										td {{ entry.numOfAbsecnes}}
							pure-vue-chart(
								:points="secondHalfBarGraph"
								:width="500"
								:height="200"
								:show-values="true"
							)

*/
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

		months : ['July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June']
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
		}
	}
}
</style>
