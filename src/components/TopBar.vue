<template lang="pug">
.top-bar(:class='mode')
	.left
		.logo
			img(src='/img/musd-logo.png')
			.logo-text
				p Madera Unified
				h1 Equity Report Dashboard
	.right
		.dropdowns
			dropdown.schools(:options='schools' v-model='selectedOptions.school')
			dropdown.years(:options='years' v-model='selectedOptions.year')
		.account-wrapper(v-bind:class='{ open: controlPanelOpen }' @mouseenter='controlPanelOpen = !controlPanelOpen' @mouseleave='controlPanelOpen = !controlPanelOpen')
			.account
				.name-display
					h1 {{ user.name }}
					h2(v-if='selectedSchoolValue === ""') {{ user.location }}
					h2(v-else) Viewing: {{ activeSiteName }}
				.profile-picture
					img(:src='user.photoUrl')
			.control-panel
				.logout-button(@click='signOut') Sign Out
</template>

<script>
import { GetYears, GetSchools } from '@/lib/API';
import Dropdown from '@/components/Dropdown';

export default {
	name : 'top-bar',
	data : () => ( {

		controlPanelOpen : false,

		selectedSchoolValue : '',
		schoolSites         : [],

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

		selectedOptions : {
			school : '',
			year   : ''
		},

	} ),

	created() {
		const { school, year } = this.$route.query;
		const selected = this.$store.dispatch( 'setSelected', { school, year } );

		this.selectedOptions = this.selected;
	},

	computed : {

		user() {
			return this.$store.state.user;
		},

		mode() {
			return this.user.mode;
		},

		selected() {
			return this.$store.state.selected;
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

		signOut() {

			this.controlPanelOpen = false;

			this.$store.dispatch( 'logout' )
				.then( () => {
					this.$router.push( '/login' );
				} );

		},

	},

	components : {
		Dropdown
	}
};
</script>

<style lang="scss">
.top-bar {
	background-color: $color-secondary-lightened;
	box-shadow: 0px 2px 4px rgba(0,0,0,0.25);
	z-index: 11;
	transition: all 0.5s ease;
	display: flex;
	align-items: center;
	justify-content: space-between;

	&.day {
		background-color: white;

		.logo {

			.logo-text {

				p {
					color: $color-secondary;
				}

				h1 {
					color: $color-primary;
				}
			}
		}

		.account-wrapper {

			&:not(.open) {

				.account::after {
					border-color: $color-primary;
				}
			}

			.account {

				&::before {
					background-color: $color-primary;
				}

				.name-display {

					h1 {
						color: $color-primary;
					}

					h2 {
						color: rgba(0,0,0,0.5);
					}
				}

				.profile-picture {
					background-color: transparentize($color-primary, 0.5);
				}
			}

			.control-panel {
				background-color: $background-primary;

				.select-site {

					p {
						color: $color-secondary;
					}
				}
			}
		}
	}

	.left {
		.logo {
			padding: 15px;
			padding-left: 25px;
			display: flex;
			align-items: center;
			z-index: 1;
			transition: all 0.5s ease;

			img {
				height: 30px;
				margin-right: 10px;
				margin-bottom: 1px;
			}

			.logo-text {
				max-width: 500px;
				transition: all 0.5s ease;

				h1,
				p {
					color: white;
					white-space: nowrap;
					text-align: left;
				}

				h1 {
					font-size: 16px;
					font-weight: 400;
				}

				p {
					font-weight: 300;
					font-size: 12px;
					opacity: 0.5;
				}
			}
		}
	}

	.right {
		display: flex;

		.dropdowns {
			display: flex;
			margin-right: 15px;

			.schools {
				margin-right: 11px;
			}

			.years {
				min-width: 150px;
			}
		}

		.account-wrapper {
			margin-right: 25px;
			position: relative;

			&:not(.open) {

				.control-panel {
					opacity: 0;
					pointer-events: none;
				}

				.account {

					&::after {
						transform: translate(-50%, calc(-50% - 5px)) rotate(45deg);
						height: 0;
						width: 0;
						border-color: transparent !important;
					}

					&::before {
						height: 0;
						width: 0;
					}
				}
			}

			.account {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				cursor: pointer;
				position: relative;
				z-index: 10;

				.name-display {

					h1 {
						font-size: 14px;
						font-weight: 300;
						text-align: right;
						color: white;
						margin-bottom: 3px;
					}

					h2 {
						font-size: 10px;
						text-align: right;
						font-weight: 300;
						color: rgba(255,255,255,0.5);
					}
				}

				.profile-picture {
					margin-left: 15px;
					height: 30px;
					width: 30px;
					background-color: rgba(255,255,255,0.5);
					border-radius: 15px;
					overflow: hidden;
					position: relative;

					img {
						height: 100%;
					}
				}
			}

			.control-panel {
				position: absolute;
				width: calc(100% + 20px);
				min-width: 200px;
				top: -10px;
				left: 50%;
				transform: translateX(-50%);
				padding-top: 50px;
				padding: 10px;
				padding-top: 50px;
				background-color: $background-secondary;
				z-index: 1;
				box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.25), 0px 0px 0px 1px rgba(0,0,0,0.08);
				transition: all 0.2s ease;

				&::after {
					content: " ";
					transition: all 0.2s ease;
					height: 8px;
					width: 8px;
					border: 1px solid white;
					border-top: 0;
					border-left: 0;
					transform: translate(-50%, -50%) rotate(-135deg);
					position: absolute;
					top: calc( ( 26px / 2 ) + 5px );
					left: calc( ( 26px / 2 ) + 10px );
				}

				&::before {
					content: " ";
					transition: all 0.2s ease;
					height: 26px;
					width: 26px;
					border-radius: 50%;
					position: absolute;
					background-color: white;
					opacity: 0.5;
					transform: translate(0%, 0%);
					top: 5px;
					left: 10px;
				}

				.select-site {
					margin-top: 10px;

					> p {
						font-size: 12px;
						font-weight: 300;
						margin-bottom: 10px;
						//padding-left: 10px;
						color: white;
					}

					select{
						width: 100%;
					}

					.dropdown {

						&.open {

							.select-display::after {
								transform: translateY(1px) rotate(-135deg);
							}
						}

						.select-display {
							border-radius: 0 !important;
							padding: 10px;

							&::after {
								border: 1px solid #00A8FF;
								border-top: 0;
								border-left: 0;
								transform: translateY(-2px) rotate(45deg);
								height: 5px;
								width: 5px;
							}

							p {
								font-size: 12px;
							}
						}

						.options-wrapper {
							border-radius: 0;

							.option {
								background-color: $background-primary-darkened;
								padding: 10px;

								&:hover {
									background-color: $background-primary;
								}

								p {
									font-size: 12px;
									color: $background-secondary !important;
									font-weight: 300;
								}
							}
						}
					}
				}
			}

			.logout-button {
				background-color: $status-red;
				padding: 10px;
				margin-top: 10px;
				color: white;
				font-size: 12px;
				font-weight: 300;
				text-align: center;
				cursor: pointer;

				&:active {
					opacity: 0.8;
				}
			}
		}
	}

}

@media (max-width: $mobile) {

	.top-bar {

		.account-wrapper {

			.control-panel {
				right: -10px;
				left: unset;
				transform: none;
			}
		}
	}
}
</style>
