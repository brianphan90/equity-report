<route>
{
	"meta" : {
		"topbarTitle" : "GLR By Classroom",
		"navOptions": {
			"title": "By Classroom",
			"icon" : "whatever"
		}
	}
}
</route>

<template lang='pug'>
.glr-by-classroom
	h1 GLR By Classroom
	data-view-state-manager(
		:state='state'
		:error-message='errorMessage'
	)
		.content(slot='loaded')
			simple-stacked-bar-chart(
				v-for='item in data.charts'
				:data='item.data.chart'
				:legend='data.legend'
			)
</template>

<script>
import { GetGlrByClassroom } from '@/lib/API';
import DataViewLoader from '@/components/DataViewLoader';
import DataViewStateManager from '@/components/DataViewStateManager';
import SimpleStackedBarChart from '@/components/charts/SimpleStackedBarChart';

export default {
	name : 'glr-by-classroom',

	extends : DataViewLoader,

	data : () => ( {
		fetch : GetGlrByClassroom,
	} ),

	components : {
		DataViewStateManager,
		SimpleStackedBarChart,
	}
};
</script>

<style lang='scss'>
</style>
