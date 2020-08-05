<route>
{
	"redirect": "/climate-and-engagement/discipline/behavior-incidents-overview",
	"meta" : {
		"navOptions": {
			"title": "Climate and Engagement"
		}
	}
}
</route>

<template lang="pug">
	.climate-and-engagement
		router-view
</template>

<script>
export default {
	name : 'climate-and-engagement',
};
</script>

<style lang="scss">
.climate-and-engagement {
	width: 100%;
	height: 100%;
}
</style>
