<route>
{
	"meta" : {
		"topbarTitle" : "SPC by Grade Level and Subgroup",
		"navOptions": {
			"title": "By Grade Level and Subgroup",
			"icon" : "whatever"
		}
	}
}
</route>

<template lang='pug'>
	.spc-by-grade-level-and-subgroup
		h1.page-title {{ data.populationCount.label }}
		data-view-state-manager(
			:state='state'
			:error-message='errorMessage'
		)
			.content.dynamic-mode-background-secondary.floating-side-text(slot='loaded' v-if='data')
				.population-count
					p.count(:style='{ color : data.populationCount.color }') {{ data.populationCount.value }}
					p.label(:style='{ color : data.populationCount.color }') Total Students
				.charts
					striped-bar-chart.chart(
						v-for='item in data.charts'
						:data='item.data'
						:legend='item.legend'
						:title='item.title'
						:options='options'
						@b-value='bValue = Math.max( $event, bValue )'
					)

</template>

<script>
import { GetSpcByGradeLevelAndSubgroup } from '@/lib/API';
import DataViewLoader from '@/components/DataViewLoader';
import DataViewStateManager from '@/components/DataViewStateManager';
import StripedBarChart from '@/components/charts/StripedBarChart';

export default {
	name : 'spc-by-grade-level-and-subgroup',

	extends : DataViewLoader,

	data : () => ( {
		fetch  : GetSpcByGradeLevelAndSubgroup,
		bValue : 0,
	} ),

	computed : {
		options() {
			return {
				maxTextLength   : 150,
				preferredBValue : this.bValue,
			};
		}
	},

	components : {
		DataViewStateManager,
		StripedBarChart,
	}
};
</script>

<style lang='scss'>
.spc-by-grade-level-and-subgroup {
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
		border-radius: 5px;
		padding: 40px 60px 40px 40px;
		display: flex;
		flex-direction: column;

		&::before {
			content: "Student Population";
			font-size: 48px !important;
		}

		.population-count {
			display: flex;
			align-items: flex-end;

			.count,
			.label {
				font-family: "Roboto Slab", serif;
			}

			.count {
				font-size: 95px;
				font-weight: 900;
				line-height: 79px;
				margin-right: 10px
			}

			.label {
				font-weight: bold;
				font-size: 36px;
				line-height: 118.7%;
				text-align: left;
			}
		}

		.charts {
			display: flex;
			flex: 1 1 0;
			margin-top: 15px;

			.chart {
				flex: 1 1 0;
				height: 100%;
			}
		}
	}

}
</style>
