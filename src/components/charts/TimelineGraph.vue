<template lang="pug">
.chart
	svg(
		ref='svg'
	)
</template>

<script>
import * as d3 from 'd3';
import BaseChart from '@/components/charts/BaseChart';
import HorizontalStripedBarChart from '@/components/charts/HorizontalStripedBarChart';
import colors from '@/assets/js/colors';

export default {
	name : 'timeline-graph',
};
</script>

<style lang='scss'>
.chart {
	width: 100%;
	flex: 1 1 0;

	svg {
		height: 100%;
		width: 100%;
	}
}
</style>
