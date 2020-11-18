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
				.left-chart
					.data-grid
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

import PureVueChart from 'pure-vue-chart';

export default {
	name : 'certificated-attendance-disaggregated',

	extends : DataViewLoader,

	data : () => ( {
		fetch : GetCertificatedAttendanceDisaggregated,
		ChangeIndicator,
		SimpleStackedBarChart,

		months : ['July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June']
	} ),

	computed : {
		firstHalfDataChart() {
			const half = Math.ceil( this.data.chart.data.length / 2 );
			console.log( this.data.legend );
			return this.data.chart.data.slice( 0, half );
		},
		secondHalfDataChart() {
			const half = Math.ceil( this.data.chart.data.length / 2 );
			return this.data.chart.data.slice( half, this.data.chart.data.length );
		},
		firstHalfBarGraph() {
			const dataArray = [];
			const halfArray = this.data.chart.data.length / 2;

			for ( let i = 0; i < halfArray; i++ ) {
				dataArray.push( this.data.chart.data[i].totalInstruction );
			}
			return dataArray;
		},
		secondHalfBarGraph() {
			const dataArray = [];
			const arrayLength = this.data.chart.data.length;
			const halfArray = this.data.chart.data.length / 2;

			for ( let i = halfArray; i < arrayLength; i++ ) {
				dataArray.push( this.data.chart.data[i].totalInstruction );
			}
			return dataArray;
		}
	},

	components : {
		DataViewStateManager,
		DisaggregatedGraphicWrapper,
		ChartLegend,
		StackedComparisonCharts,
		PureVueChart
	}
};
</script>

<style lang='scss'>
.certificated-attendance-disaggregated {
	height: 100%;
	width: 100%;
	.content {
		margin: 0 20px;
		padding: 20px 100px 20px 20px;
		border-radius: 5px;
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
		.page-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 30px;
			.title {
				margin-bottom: 15px;
				margin-right: 30px;
				h1 {
					font-size: 24px;
					font-family: 'Roboto Slab';
					text-align: left;
					font-weight: bold;
					letter-spacing: 0.045em;
					&.subtitle {
						font-weight: 400;
					}
				}
			}
			.legend {
				legend {
					display : flex;
				}
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
