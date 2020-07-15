<template lang="pug">
  .simple-bar-chart
    svg(
      :id='id'
      ref='svg'
      height='150'
      width='150'
    )
</template>

<script>
import * as d3 from 'd3';
import BaseChart from '@/components/charts/BaseChart';

export default {
	name : 'simple-bar-chart',

	extends : BaseChart,

	data : () => ( {
		axisIndicators : null,
	} ),

	mounted() {
		this.init( this.$refs.svg, {
			t : 1,
			b : 1,
		} );
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

</style>
