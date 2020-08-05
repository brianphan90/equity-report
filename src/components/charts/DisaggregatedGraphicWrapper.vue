<template lang='pug'>
.disaggregated-graphic-wrapper
	.graph-wrapper
		component(
			:is='graph'
			:data='item.data.chart'
			:options='options'
			:legend='legend'
		)
	.label-wrapper
		p.dynamic-mode-text {{ item.label }}
	.meta-wrapper
		component(
			:is='meta'
			:data='item.data.meta'
			:legend='legend'
		)
</template>

<script>
export default {
	name  : 'disaggregated-graphic-wrapper',
	props : {
		graph : {
			type     : Object,
			required : true,
		},

		options : {
			type : Object
		},

		item : {
			type     : Object,
			required : true,
		},

		legend : {
			type     : Object,
			required : true,
		},

		meta : {
			type     : Object,
			required : true,
		}
	}
};
</script>

<style lang='scss'>
.disaggregated-graphic-wrapper {

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
