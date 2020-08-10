<route>
{
	"redirect": "/academics/grade-level-readiness/glr-by-classroom",
	"meta" : {
		"navOptions": {
			"title": "Academics",
			"icon" : "book"
		}
	}
}
</route>

<template lang="pug">
	.academics
		router-view
</template>

<script>
export default {
	name : 'academics',
};
</script>

<style lang="scss">
.academics {
	width: 100%;
	height: 100%;
}
</style>
