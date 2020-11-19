<template lang="pug">
.attendance-disaggregate-wrapper
	.left-chart
		TimelineGraph(
			:data='dataForFirstGraph'
		)
	.right-chart
		TimelineGraph(
			:data='dataForSecondGraph'
		)
</template>
<script>

import TimelineGraph from './TimelineGraph';

export default {
	name : 'attendance-disaggregate-wrapper',

	props : {
		chart : {
			type : [Array, Object],
		},
	},

	computed : {
		dataForFirstGraph() {
			const half = Math.ceil( this.chart.data.length / 2 );
			return this.chart.data.slice( 0, half );
		},

		dataForSecondGraph() {
			const half = Math.ceil( this.chart.data.length / 2 );
			return this.chart.data.slice( half, this.chart.data.length );
		}
	},
	components : {
		TimelineGraph
	}
};
</script>

<style lang="scss">
.attendance-disaggregate-wrapper {
	height: 100%;
	overflow: auto;
	.left-chart {
		float: left;
		width: 50%;
		height: 100%;
	}
	.right-chart {
		float: right;
		width: 50%;
		height: 100%;
	}
	.label-wrapper {
		padding: 10px;
		margin: 10px 0;
		border: 7px solid $color-neutral-light;
		border-right: 0;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
	}
}
</style>
