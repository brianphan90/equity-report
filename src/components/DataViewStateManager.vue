<template lang='pug'>
.data-view-state-manager
	.loading-indicator(v-if='state === "loading"') Loading
		span .
		span .
		span .
	.error-indicator(v-else-if='state === "failed"') {{ errorMessage }}
	.loaded-container(v-else-if='state === "loaded"')
		slot(name='loaded')
</template>

<script>
export default {
	name : 'data-view-state-manager',

	props : {
		state : {
			type : String,
		},
		errorMessage : {
			type : String,
		}
	},
};
</script>

<style lang='scss'>
</style>
