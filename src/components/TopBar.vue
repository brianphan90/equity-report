<template lang="pug">
.top-bar
	.left
		.logo
			img(src='/img/musd-logo.png')
			.logo-text
				p.dynamic-mode-text Madera Unified
				h1.dynamic-mode-text Equity Report Dashboard
	.right
		.dropdowns
			dropdown.schools(:options='schools' v-model='selectedOptions.school')
			dropdown.years(:options='years' v-model='selectedOptions.year')
		.account-wrapper(v-bind:class='{ open: controlPanelOpen }' @click='controlPanelOpen = !controlPanelOpen' @mouseleave='controlPanelOpen = false')
			.account
				.name-display
					h1.dynamic-mode-text {{ user.name }}
				.profile-picture.dynamic-mode-background-secondary
					img(:src='user.photoUrl')
			.control-panel.dynamic-mode-background-secondary
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
	box-shadow: 0px 2px 4px rgba(0,0,0,0.25);
	z-index: 101;
	transition: all 0.5s ease;
	display: flex;
	align-items: center;
	justify-content: space-between;

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
						margin-bottom: 3px;
					}

					h2 {
						font-size: 10px;
						text-align: right;
						font-weight: 300;
					}
				}

				.profile-picture {
					margin-left: 15px;
					height: 30px;
					width: 30px;
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
				left: 40%;
				transform: translateX(-50%);
				padding-top: 50px;
				padding: 10px;
				padding-top: 50px;
				z-index: 1;
				box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.25), 0px 0px 0px 1px rgba(0,0,0,0.08);
				transition: all 0.2s ease;
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
