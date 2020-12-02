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
		.content.dynamic-mode-background.floating-side-text(slot='loaded' v-if='data')
			.page-title
				h1.main-title.dynamic-mode-text Classified Attendance
			.chart-legend
				chart-legend(:legend="data.legend" :columns='1')
			.attendance-chart
				attendance-disaggregate-wrapper(
					:legend='data.legend'
					:chart='data.chart'
					:origin='this.origin'
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

import AttendanceDisaggregateWrapper from '@/components/charts/AttendanceDisaggregateWrapper';

export default {
	name : 'classified-attendance-disaggregated',

	extends : DataViewLoader,

	data : () => ( {
		fetch : GetClassifiedAttendanceDisaggregated,
		ChangeIndicator,
		SimpleStackedBarChart,


		origin : 'classified',
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

		.attendance-chart {
			width: 100%;
			height: 100%;
			flex: 1 1 0;
			padding: 30px;
		}
	}
}
</style>
