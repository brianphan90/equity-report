<template lang="pug">
  .simple-stacked-bar-chart
    svg(
      :ref='id'
    )
</template>

<script>
import * as d3 from 'd3';
import BaseChart from '@/components/charts/BaseChart';

export default {
	name : 'simple-stacked-bar-chart',

	extends : BaseChart,

	methods : {
		draw() {
			// draw labels
			const axisIndicators = this.drawAxisIndicators( {
				range : {
					min : 0,
					max : 100,
				},
				axis  : 'y',
				lines : {
					spaceBetweenLabelAndLines : 5,
				},
			} );

			// Compute the position and size of the bars

			// Draw the bars

			// Draw the text

			// Add hover effects

			console.log( this.canvas );
			console.log( this.data );
		}
	}
};
</script>

<style lang="scss">

</style>
