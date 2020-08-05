<route>
{
	"meta" : {
		"topbarTitle" : "ELPAC By Classroom",
		"navOptions": {
			"title" : "By Classroom",
			"icon"  : "whatever",
			"order" : 2
		}
	}
}
</route>

<template lang='pug'>
.elpac-by-classroom
	h1.page-title Academic Performance Equity Report
	data-view-state-manager(
		:state='state'
		:error-message='errorMessage'
	)
		.content.dynamic-mode-background-secondary.floating-side-text(slot='loaded' v-if='data')
			.page-header
				.title
					h1.dynamic-mode-text ELPAC
					h1.subtitle.dynamic-mode-text By Classroom
				.legend
					chart-legend(:legend='data.legend' :columns=2 )
			.charts-container.dynamic-mode-background-opaque
				disaggregated-graphic-wrapper(
					v-for='item in data.charts'
					:graph='SimpleBarChart'
					:item='item'
					:legend='data.legend'
					:meta='ElpacIndicator'
				)
</template>

<script>
import { GetElpacByClassroom } from '@/lib/API';
import DataViewLoader from '@/components/DataViewLoader';
import DataViewStateManager from '@/components/DataViewStateManager';
import SimpleBarChart from '@/components/charts/SimpleBarChart';
import DisaggregatedGraphicWrapper from '@/components/charts/DisaggregatedGraphicWrapper';
import ElpacIndicator from '@/components/charts/ElpacIndicator';
import ChartLegend from '@/components/ChartLegend';


export default {
	name : 'elpac-by-classroom',

	extends : DataViewLoader,

	data : () => ( {
		fetch : GetElpacByClassroom,
		ElpacIndicator,
		SimpleBarChart,
	} ),

	components : {
		DataViewStateManager,
		DisaggregatedGraphicWrapper,
		ChartLegend,
	}
};
</script>

<style lang='scss'>
.elpac-by-classroom {
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
