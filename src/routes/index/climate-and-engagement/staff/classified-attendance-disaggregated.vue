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
			.charts
				.left-chart
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
									tr(v-for="(entry, i) in firstHalfDataChart" :key="i")
										th(scope="row")
										td {{ entry.label }}
										td {{ entry.numOfAbsecnes}}
				.right-chart
					.data-grid
						.month-legend
							table
								thead
									tr(v-for="(entry,i) in months" :key="1")
										th {{i++}}
										td {{ entry }}
						.teacher-info
							table.table-mt-5
								thead
								tbody
									tr(v-for="(entry, i) in secondHalfDataChart" :key="i")
										th(scope="row") {{i++}}
										td {{ entry.label }}
										td {{ entry.numOfAbsecnes}}
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
	}
};
</script>

<style lang='scss'>
.classified-attendance-disaggregated {
	height: 100%;

	.content {
		.page-title {
			display: flex;

			.main-title {
					font-size: 52px;
					line-height: 69px;
					letter-spacing: 0.045em;
			}
		}
		.charts {
			width: 100%;
			height: 100%;
			display: flex;
			flex: 1 1 0;
			margin-top: 15px;
			.left-chart {
				flex: 1 1 0;
				height: 100%;
				width:50%;
				.main-title {
					font-size: 52px;
					line-height: 69px;
					letter-spacing: 0.045em;
				}
				.data-grid {
					display: grid;
					grid-template-columns: repeat(5, 1fr);
					grid-template-rows: repeat(5, 1fr);
					grid-column-gap: 0px;
					grid-row-gap: 0px;
					.month-legend {
						grid-area: 1 / 2 / 2 / 6;
						writing-mode: vertical-lr;
					}
					.teacher-info {
						grid-area: 2 / 1 / 6 / 6;
					}

				}
			}
			.right-chart {
				flex: 1 1 0;
				height: 100%;
				width: 50%;
				.main-title {
					font-size: 52px;
					line-height: 69px;
					letter-spacing: 0.045em;
				}
				.data-grid {
					display: grid;
					grid-template-columns: repeat(5, 1fr);
					grid-template-rows: repeat(5, 1fr);
					grid-column-gap: 0px;
					grid-row-gap: 0px;
					.month-legend {
						grid-area: 1 / 2 / 2 / 6;
						writing-mode: vertical-lr;
					}
					.teacher-info {
						grid-area: 2 / 1 / 6 / 6;
					}

				}
			}
		}
	}
}
</style>
