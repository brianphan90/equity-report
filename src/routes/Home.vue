<template lang="pug">
.home
	top-bar
	.main-content
		side-nav
		.view-container
			filters
			router-view.router-view
</template>

<script>
export default {
	name : 'home',

	components : {
		TopBar  : () => import( '@/components/TopBar' ),
		SideNav : () => import( '@/components/SideNav' ),
		Filters : () => import( '@/components/Filters' ),
	},
};
</script>

<style lang="scss">
.home {
	display: flex;
	flex-flow: column;
	overflow: hidden;
	height: 100vh;

	.top-bar {
		width: 100%;
	}

	.main-content {
		height: 100%;
		width: 100%;
		display: flex;
		flex-flow: row wrap;

		.view-container {
			flex: 1 1 0;

			.filters {
				width: 100%;
			}

			.router-view {
				overflow: auto;
			}
		}
	}
}
</style>
