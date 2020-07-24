<template lang="pug">
.college-tracker(ref='wrapper')
	svg(
		:id='id'
		ref='svg'
		:height='svgHeight'
		:width='svgWidth'
	)
</template>

<script>
import * as d3 from 'd3';
import BaseChart from '@/components/charts/BaseChart';

export default {
	name : 'college-tracker',

	extends : BaseChart,

	data : () => ( {
		axisIndicators : null,

		svgWidth  : null,
		svgHeight : null,
	} ),

	mounted() {
		this.init( this.$refs.svg );
	},

	methods : {
		draw() {

		},

		drawAxisIndicators() {

		}
	}

};
</script>

<style lang="scss">
.college-tracker {

}
</style>
