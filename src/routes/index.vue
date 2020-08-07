<route>
{
	"path": "/",
	"name": "main",
	"redirect": "academics"
}
</route>

<template lang="pug">
.home(:class='mode')
	top-bar.dynamic-mode-background
	.main-content.dynamic-mode-background-secondary
		side-nav(:class='mode').dynamic-mode-background
		.view-container
			//- filters
			.view-report-modal(v-if='!isReady')
				.body
					h1 Select a School Site and Year to view the Academic Performance Equity Report
					.dropdowns
						dropdown(:options='schools' v-model='selectedOptions.school')
						dropdown(:options='years' v-model='selectedOptions.year')
					.btn(@click='viewReport') View Report

			router-view.router-view(v-else)
</template>

<script>
import { GetYears, GetSchools } from '@/lib/API';

export default {
	name : 'home',

	data : () => ( {
		clickedViewReport : false,

		selectedOptions : {
			school : '',
			year   : ''
		},

		schools : {
			options      : GetSchools,
			defaultValue : '',
			selectText   : 'Select a School'
		},

		years : {
			options      : GetYears,
			defaultValue : '',
			selectText   : 'Select a Year'
		},
	} ),

	created() {
		const { school, year } = this.$route.query;
		const selected = this.$store.dispatch( 'setSelected', { school, year } );

		this.selectedOptions = this.selected;

		if ( school && year ) {
			this.clickedViewReport = true;
		}
	},

	computed : {
		mode() {
			return this.$store.state.user.mode;
		},

		selected() {
			return this.$store.state.selected;
		},

		isReady() {
			const { selected, clickedViewReport } = this;
			const { school, year } = selected;

			return school && year && clickedViewReport;
		}
	},

	watch : {
		selectedOptions : {
			deep : true,
			handler( selectedOptions ) {
				this.$store.dispatch( 'setSelected', selectedOptions );
			}
		},

		selected : {
			deep : true,
			handler( selected ) {
				const { school, year } = this.selectedOptions;

				if ( selected.school !== school || selected.year !== year ) {
					this.selectedOptions = selected;
				}
			}
		}
	},

	methods : {
		viewReport() {
			this.clickedViewReport = true;
		}
	},

	components : {
		TopBar   : () => import( '@/components/TopBar' ),
		SideNav  : () => import( '@/components/SideNav' ),
		Dropdown : () => import( '@/components/Dropdown' )
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

		.dynamic-mode-background {
			background: $color-secondary-darkened;
		}

		.dynamic-mode-border {

			&.right {
				border: 0px solid transparent;
				border-right: 2px solid $background-primary;
			}

			&.top {
				border: 0px solid transparent;
				border-top: 2px solid $background-primary;
			}

			&.bottom {
				border: 0px solid transparent;
				border-bottom: 2px solid $background-primary;
			}

			&.left {
				border: 0px solid transparent;
				border-left: 2px solid $background-primary;
			}
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

	.dynamic-mode-background {
		background: $background-primary;
		transition: background 0.4s ease;
	}

	.dynamic-mode-background-opaque {
		background: $background-primary;
		transition: background 0.4s ease;
	}

	.dynamic-mode-border {
		border: 2px solid $color-neutral-dark;

		&.right {
			border: 0px solid transparent;
			border-right: 2px solid $color-neutral-dark;
		}

		&.top {
			border: 0px solid transparent;
			border-top: 2px solid $color-neutral-dark;
		}

		&.bottom {
			border: 0px solid transparent;
			border-bottom: 2px solid $color-neutral-dark;
		}

		&.left {
			border: 0px solid transparent;
			border-left: 2px solid $color-neutral-dark;
		}
	}

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

		.content.floating-side-text {

			&::before {
				position: fixed;
				top: calc(50% + 120px);
				right: 0;
				transform: rotate(90deg) translate(-40px,-47.5vw);
				font-size: 64px;
				font-family: "Roboto Slab";
				font-weight: 800;
				width: 100vw;
				height: 10px;
				color: rgba($color-neutral-dark, 0.15);
				text-transform: uppercase;
				letter-spacing: 5px;
			}
		}

		.view-container {
			flex: 1 1 0;
			height: 100%;
			max-height: 100%;
			position: relative;
			display: flex;
			justify-content: center;


			.filters {
				width: 100%;
			}

			.view-report-modal {
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				right: 0;
				background:rgba(46, 54, 58, 0.7);
				backdrop-filter: blur(20px);
				z-index: 100;

				.body {
					position: absolute;
					top: 20%;
					left: 50%;
					transform: translate(-50%);
					width: 70%;
					max-width: 750px;
					display: flex;
					flex-direction: column;
					align-items: center;

					h1 {
						color: white;
						margin-bottom: 30px;
					}

					.dropdowns {
						display: flex;
						margin-bottom: 50px;
						width: 100%;

						.dropdown {
							margin: 0px 8px;
							flex: 1 1 0;

							select {
								font-size: 16px;
								padding: 10px 20px;
								color: white;
								background-color: #0081C2;
							}
						}
					}

					.btn {
						background: white;
						color: #0081C2;
						letter-spacing: 0.1em;
						font-weight: bold;
						font-size: 20px;
						line-height: 26px;
						border-radius: 100px;
						padding: 15px 20px;
						text-transform: uppercase;
						cursor: pointer;
					}
				}
			}

			.router-view {
				max-width: 1000px;

				h1.main-title {
					font-family: 'Roboto Slab';
					font-style: normal;
					font-weight: bold;
					display: flex;
					align-items: center;
					color: $color-text-secondary;
					margin-right: 10px;
				}

				h2.sub-title {
					font-family: 'Roboto Slab';
					font-style: normal;
					font-weight: 300;
					display: flex;
					align-items: center;
					color: $color-text-secondary;
				}

			}
		}
	}
}
</style>
