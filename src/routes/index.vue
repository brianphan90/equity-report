<route>
{
	"path": "/",
	"name": "main",
	"redirect": "academics"
}
</route>

<template lang="pug">
.home
	top-bar
	.main-content(:class='mode')
		side-nav
		.view-container
			//- filters
			router-view.router-view
</template>

<script>
export default {
	name : 'home',

	computed : {
		mode() {
			return this.$store.state.user.mode;
		}
	},

	components : {
		TopBar  : () => import( '@/components/TopBar' ),
		SideNav : () => import( '@/components/SideNav' ),
		// Filters : () => import( '@/components/Filters' ),
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
		flex: 1 1 0;
		transition: background 0.4s ease;

		&.night {
			background: $color-secondary-darkened;

			.dynamic-mode-text {
				color: $background-primary;
			}

			.dynamic-mode-background-secondary {
				background: $color-secondary-lightened;
			}

			.dynamic-mode-background-opaque {
				background: rgba( $background-primary, 0.1 );
			}
		}

		.dynamic-mode-text {
			color: $color-neutral-dark;
			transition: color 0.4s ease;
		}

		.dynamic-mode-background-secondary {
			background: $background-primary-darkened;
			transition: background 0.4s ease;
		}

		.dynamic-mode-background-opaque {
			background: $background-primary;
			transition: background 0.4s ease;
		}

		.view-container {
			flex: 1 1 0;
			height: 100%;
			max-height: 100%;
			position: relative;

			.filters {
				width: 100%;
			}
		}
	}
}
</style>
