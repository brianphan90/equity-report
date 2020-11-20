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
			.attendance-chart
				attendance-disaggregate-wrapper(
					:legend='data.legend'
					:chart='data.chart'
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


import AttendanceDisaggregateWrapper from './Graphs/AttendanceDisaggregateWrapper';


export default {
	name : 'classified-attendance-disaggregated',

	extends : DataViewLoader,

	data : () => ( {
		fetch : GetClassifiedAttendanceDisaggregated,
		ChangeIndicator,
		SimpleStackedBarChart,

		months : ['July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June']
	} ),

	computed : {
		firstHalfDataChart() {
			const half = Math.ceil( this.data.chart.data.length / 2 );
			return this.data.chart.data.slice( 0, half );
		},
		secondHalfDataChart() {
			const half = Math.ceil( this.data.chart.data.length / 2 );
			return this.data.chart.data.slice( half, this.data.chart.data.length );
		}

	},

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
.classified-attendance-disaggregated {
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
		}
	}
}
</style>
