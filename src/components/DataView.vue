<template lang='pug'>
.data-view
	router-view
</template>

<script>
export default {
	name : 'data-view',
};
</script>

<style lang='scss'>
.night {

	.data-view {

		h1.page-title {
			color: $background-primary;
		}
	}
}
.data-view {
	height: 100%;

	h1.page-title {
		font-size: 24px;
		font-weight: 400;
		margin: 30px 0;
		color: $color-neutral-dark;
	}
}
</style>
