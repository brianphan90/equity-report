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
		data-view-state-manager(
			:state='state'
			:error-message='errorMessage'
		)
			.content(slot='loaded' v-if='data')
				.population-count
					p.count(:style='{ color : data.populationCount.color }') {{ data.populationCount.value }}
					p.label {{ data.populationCount.label }}
				.charts
					simple-bar-chart(
						v-for='item in data.charts'
						:data='item.data.chart'
						:legend='data.legend'
					)

</template>

<script>
import { GetSpcByGradeLevelAndSubgroup } from '@/lib/API';
import DataViewLoader from '@/components/DataViewLoader';
import DataViewStateManager from '@/components/DataViewStateManager';
import SimpleBarChart from '@/components/charts/SimpleBarChart';

export default {
	name : 'spc-by-grade-level-and-subgroup',

	extends : DataViewLoader,

	data : () => ( {
		fetch : GetSpcByGradeLevelAndSubgroup,
	} ),

	components : {
		DataViewStateManager,
		SimpleBarChart,
	}
};
</script>

<style lang='scss'>
	.spc-by-grade-level-and-subgroup {

		.content {

			.population-count {
				display: flex;
				width: 70%;
				align-items: center;

				.count {
					font-size: 67px;
					font-weight: 900;
					line-height: 79px;
					margin-right: 10px
				}

				.label {
					font-weight: bold;
					font-size: 24px;
					line-height: 118.7%;
					color: black;
					text-align: left;
				}
			}
		}

	}
</style>
