<template lang="pug">
.attendance-disaggregate-wrapper
	.left-chart
		h1(v-for='(entry,i) in months' :key='i') {{entry}}
	.right-chart
		h1(v-for='(entry,i) in months' :key='i') {{entry}}
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
		months() {
			return [
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
			];
		},
	},
	components : {
		TimelineGraph
	}
};
</script>

<style lang="scss">
.attendance-disaggregate-wrapper {
	width: 100%;
	.left-chart {
		float: left;
		width: 50%;
	}
	.right-chart {
		float: right;
		width: 50%;
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
