<route>
{
	"meta" : {
		"topbarTitle" : "Academic Performance Equity Report",
		"navOptions": {
			"title" : "By Classroom",
			"icon"  : "whatever",
			"order" : 3
		}
	}
}
</route>

<template lang='pug'>
.glr-by-classroom
	h1.page-title Academic Performance Equity Report
	data-view-state-manager(
		:state='state'
		:error-message='errorMessage'
	)
		.content.dynamic-mode-background-secondary.floating-side-text(slot='loaded' v-if='data')
			.page-header
				.title
					h1.dynamic-mode-text Grade Level Readiness
					h1.subtitle.dynamic-mode-text By Classroom
				.legend
					chart-legend(:legend='data.legend')
			.charts-container.dynamic-mode-background-opaque
				disaggregated-graphic-wrapper(
					v-for='item in data.charts'
					:graph='SimpleStackedBarChart'
					:item='item'
					:legend='data.legend'
					:meta='ChangeIndicator'
				)
</template>

<script>
import { GetGlrByClassroom } from '@/lib/API';
import DataViewLoader from '@/components/DataViewLoader';
import DataViewStateManager from '@/components/DataViewStateManager';
import SimpleStackedBarChart from '@/components/charts/SimpleStackedBarChart';
import DisaggregatedGraphicWrapper from '@/components/charts/DisaggregatedGraphicWrapper';
import ChangeIndicator from '@/components/charts/ChangeIndicator';
import ChartLegend from '@/components/ChartLegend';

export default {
	name : 'glr-by-classroom',

	extends : DataViewLoader,

	data : () => ( {
		fetch : GetGlrByClassroom,
		ChangeIndicator,
		SimpleStackedBarChart,
	} ),

	components : {
		DataViewStateManager,
		DisaggregatedGraphicWrapper,
		ChartLegend,
	}
};
</script>

<style lang='scss'>
.glr-by-classroom {
	height: 100%;
	display: flex;
	flex-direction: column;

	.data-view-state-manager {
		flex: 1 1 0;
	}

	.loaded-container {
		height: 100%;
	}

	.content {
		margin: 0 20px;
		background: $color-neutral-light;
		padding: 20px 100px 20px 20px;
		border-radius: 5px;
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;

		&::before {
			content: "GLR Breakdown";
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
					font-size: 36px;
					font-family: 'Roboto Slab';
					text-align: left;
					font-weight: 800;

					&.subtitle {
						font-weight: 400;
					}
				}
			}
		}

		.charts-container {
			background: $background-primary;
			display: flex;
			flex-flow: wrap;
			justify-content: space-between;
			border-radius: 5px;
			flex: 1 1 0;
			overflow: auto;

			.disaggregated-graphic-wrapper {
				margin: 30px;
				flex: 1 0 150px;

				&:nth-last-child(1) {
					margin-bottom: 100px; // gives the scroll a little more space
				}
			}
		}
	}
}
</style>
