<route>
{
	"meta" : {
		"topbarTitle" : "ELPAC By Grade Level and Subgroup",
		"navOptions": {
			"title" : "By Grade Level and Subgroup",
			"icon"  : "whatever",
			"order" : 1
		}
	}
}
</route>

<template lang='pug'>
.elpac-by-grade-level-and-subgroup
	h1.page-title Academic Performance Equity Report
	data-view-state-manager(
		:state='state'
		:error-message='errorMessage'
	)
		.content.dynamic-mode-background-secondary.floating-side-text(slot='loaded' v-if='data')
			.page-header
				.title
					h1.dynamic-mode-text ELPAC By Grade
					h1.subtitle.dynamic-mode-text Level and Subgroups
				.legends
					.legend-wrapper(v-for='legend in formattedLegends')
						p.dynamic-mode-text {{ legend.title }}
						chart-legend(:legend='legend.items' :columns='1')
					.legend-wrapper
			.charts-container
				.bar-charts.dynamic-mode-background-opaque
					labeled-bar-chart(
						v-for='barChart in barCharts'
						:data='barChart.data'
						:title='barChart.title'
						:sub-title='barChart.subTitle'
						:options='barChartOptions'
					)

</template>

<script>
import { GetElpacByGradeLevelAndSubgroup } from '@/lib/API';
import DataViewLoader from '@/components/DataViewLoader';
import DataViewStateManager from '@/components/DataViewStateManager';
import ChartLegend from '@/components/ChartLegend';
import LabeledBarChart from '@/components/charts/LabeledBarChart';

export default {
	name : 'elpac-by-grade-level-and-subgroup',

	extends : DataViewLoader,

	data : () => ( {
		fetch           : GetElpacByGradeLevelAndSubgroup,
		barChartOptions : {
			numberOfIndicators : 6,
			isDefaultRange     : true,
		}
	} ),

	computed : {
		formattedLegends() {
			const { legends } = this.data;

			if ( !legends ) {
				return [];
			}

			return Object.keys( legends ).reduce( ( arr, key ) => {
				const legend = legends[key];

				if ( !legend.title ) {
					return arr;
				}

				arr.push( legend );

				return arr;

			}, [] );
		},

		barCharts() {
			const { charts } = this.data;

			return charts.filter( a => a.type === 'bar-chart' );
		}
	},

	components : {
		DataViewStateManager,
		ChartLegend,
		LabeledBarChart
	}
};
</script>

<style lang='scss'>
.elpac-by-grade-level-and-subgroup {
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
		margin: 0 20px;
		padding: 20px 100px 20px 20px;
		border-radius: 5px;
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;

		&::before {
			content: "ELPAC Breakdown";
		}

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
					font-weight: 800;

					&.subtitle {
						font-weight: 400;
					}
				}
			}
		}

		.legends {
			display: flex;

			p {
				font-family: 'Roboto Slab';
				font-style: normal;
				font-weight: bold;
				font-size: 12px;
				line-height: 16px;
				text-align: left;
				margin-bottom: 5px;
			}
		}

		.charts-container {
			flex: 1 1 0;
			overflow: auto;

			.bar-charts {
				padding: 25px 20px;
				border-radius: 15px;

				.labeled-bar-chart {
					margin-bottom: 20px;
				}
			}
		}
	}
}
</style>
