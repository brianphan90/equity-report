<template lang="pug">
aside.side-nav(:class='[mode, { "closed" : navClosed }]')
	.nav-menu
		.menu-item(v-for='( item, navIndex ) in nav' @mouseleave='closeSubMenuIfNecessary( item, navIndex )' v-bind:class='{ open : item.open, "sub-nav" : item.subNav.length, unavailable: item.unavailable }' v-bind:title='item.unavailable ? "Coming Soon" : ""')
			.item(:class='{ active : isActiveNavItem( item ) }' @click='selectMenuItem( item, navIndex )' v-if='item.type != "link"')
				.icons {{ item.icon }}
				p {{ item.text }}
			a.item(:class='{ active : isActiveNavItem( item ) }' @click='selectMenuItem( item )' v-if='item.type == "link"' v-bind:href='item.href')
				.icons {{ item.icon }}
				p {{ item.text }}
			.sub-menu
				a.sub-item(v-for='( subItem, i ) in item.subNav' v-bind:href='getHref( navIndex, i )' v-bind:class='{ active : isActiveSubNav( subItem ), unavailable: subItem.unavailable }') {{ subItem.text }}
	.bottom-bar
		.toggle(@click='navClosed = !navClosed')
		.night-day.no-select(v-bind:class='{ night: nightMode, day : !nightMode }' @click='nightMode = !nightMode')
</template>

<script>
import routes from 'vue-auto-routing';

console.log( routes );

export default {
	name : 'side-nav',

	data : () => ( {
		navClosed : false,
		nightMode : true,

		nav : [
			{
				text   : 'Equity Report',
				icon   : 'f',
				open   : false,
				route  : '/equity-report',
				subNav : [
					{
						text : 'Academics',
						type : 'link',
						href : '/academics'
					},
					{
						text : 'Climate and Engagement',
						type : 'link',
						href : '/climate'
					}
				]
			}
		],

		closeTimeout : {},
	} ),

	created() {

		const { user } = this.$store.state;

		const viewMode      = user.mode;
		const { navClosed } = user;

		this.navClosed = navClosed;
		this.nightMode = viewMode === 'night';

		const { nav }  = this;
		const navState = user.navItemState || [];

		nav.forEach( ( item, i ) => {

			const itemOpen = ( () => {
				const state = navState[i];

				if ( !state || this.navClosed ) {
					return false;
				}

				return state.open;
			} )();

			// we only need to set this property
			// if there are items in the submenu
			if ( item.subNav.length ) {
				this.$set( this.nav[i], 'open', itemOpen );
			}

		} );

	},

	computed : {

		user() {
			return this.$store.state.user;
		},

		mode() {
			return this.user.mode;
		},

		pagePath() {
			return this.$route.path;
		}

	},

	watch : {

		nightMode( nightMode ) {

			if ( nightMode ) {
				this.$store.dispatch( 'setMode', 'night' );

				return;
			}

			this.$store.dispatch( 'setMode', 'day' );

		},

		navClosed( closed ) {

			this.$store.dispatch( 'setNavClosed', closed );

			this.nav.forEach( ( item ) => {
				item.open = false; // eslint-disable-line
			} );

		}

	},

	methods : {

		selectMenuItem( item, itemIndex ) {

			if ( item.subNav.length ) {
				item.open = !item.open; // eslint-disable-line
			}

			this.nav.forEach( ( navItem, i ) => {

				if ( this.navClosed && i !== itemIndex ) {
					navItem.open = false; // eslint-disable-line
				}

			} );

			this.updateLocalStorageRecord();

		},

		closeSubMenuIfNecessary( item ) {

			if ( !item.subNav.length || !this.navClosed ) {
				return;
			}

			item.open = false; // eslint-disable-line

			this.updateLocalStorageRecord();

		},

		updateLocalStorageRecord() {

			const navItems     = this.nav;
			const navItemState = navItems.map( ( item ) => {

				let open = false;

				if ( item.hasOwnProperty( 'open' ) ) {
					open = item.open; // eslint-disable-line
				}

				return { open };
			} );

			this.$store.dispatch( 'setNavItemState', JSON.stringify( navItemState ) );

		},

		getHref( navIndex, subNavIndex ) {

			const navItems = this.nav;
			const item     = navItems[navIndex];
			const subItem  = item.subNav[subNavIndex];
			const route    = item.hasOwnProperty( 'route' ) ? item.route : '';
			const subRoute = subItem.hasOwnProperty( 'href' ) ? subItem.href : '';

			if ( subItem.unavailable ) {
				return '';
			}

			return route + subRoute;

		},

		isActiveNavItem( item ) {

			const { path }   = this.$route;
			const pathPieces = path.split( '/' );

			return item.href === path || item.route === `/${pathPieces[1]}`;

		},

		isActiveSubNav( item ) {

			const { path }   = this.$route;
			const pathPieces = path.split( '/' );

			return item.href === `/${pathPieces.pop()}`;

		},

	},

};
</script>

<style lang="scss">
.side-nav {
	background-color: $color-secondary;
	flex: 0 0 300px;
	height: 100%;
	max-width: 500px;
	display: flex;
	flex-direction: column;
	transition: all 0.5s ease;
	z-index: 10;
	overflow: hidden auto;

	&.day {
		background-color: $background-primary-darkened;

		.nav-menu {

			.menu-item {

				&::hover {
					background-color: rgba(0,0,0,0.04);
				}

				&.sub-nav {

					.item::after {
						border-left-color: $color-secondary;
					}
				}

				&.open {

					.sub-menu {
						background-color: white !important;
					}
				}

				.item {

					&.active {
						background-color: rgba(0,0,0,0.08);

						.icons {
							color: $color-primary;
						}

						p {
							color: $color-primary;
						}
					}

					.icons {
						color: $color-secondary;
					}

					p {
						color: $color-secondary;
					}
				}

				&.open {

					.item {
						background-color: rgba(0,0,0,0.06);

						&.active {
							background-color: rgba(0,0,0,0.08);
						}
					}

					.sub-menu {
						background-color: rgba(150, 150, 150, 0.1);
					}
				}

				.sub-menu {

					.sub-item {
						color: $color-secondary;
					}
				}
			}
		}

		.bottom-bar {

			.night-day {
				background-color: transparentize( $color-primary, 0.5 );
			}

			.toggle {
				background-color: $color-primary;
			}
		}
	}

	&.closed {
		max-width: 45px;

		.nav-menu {
			overflow-x: hidden;
			width: 300px;
			pointer-events: none;

			.menu-item {
				position: relative;
				background-color: transparent !important;
				pointer-events: all;

				&:hover {

					.item {
						background-color: rgba(255,255,255,0.1);
					}
				}

				&.open {
					overflow: visible;

					.item{
						border-right-color: transparent !important;

						.icons {
							color: $color-primary !important;
						}
					}

					.sub-menu {
						position: absolute;
						left: 55px;
						background: $color-secondary;
						max-width: 243px;
						width: 243px;
						padding: 15px 15px 15px 0 !important;
						z-index: 10;
						max-height: none !important;
						top: 0px;
						overflow: visible;
						border-left: 5px solid $color-primary;
						pointer-events: all;
						box-shadow: 0px 1px 2px rgba(0,0,0,0.25);

						&::before {
							content: ' ';
							height: 0;
							width: 0;
							position: absolute;
							top: 22px;
							left: -13px;
							border: 8px solid $color-primary;
							border-left: 0;
							border-top-color: transparent;
							border-bottom-color: transparent;
							transform: translateY(-50%);
						}
					}
				}

				.item {
					padding: 15px;
					overflow: hidden;
					max-width: 45px;

					&:not(.active):not(:hover) {
						background-color: transparent !important;
					}

					&::after {
						opacity: 0;
					}

					img {
						margin-left: 10px;
					}

					p {
						opacity: 0;
					}
				}

				.sub-menu {
					max-height: 0 !important;
					padding: 0 !important;
				}
			}
		}

		.bottom-bar {
			padding: 7px;
			padding-bottom: 15px;
			margin-top: 45px;

			.night-day {
				left: 7px;
				bottom: 60px;
			}

			.toggle {

				&::after {
					transform: translateX(-1px) rotate(45deg);
				}
			}
		}
	}

	.nav-menu {
		flex: 1 1 0;
		overflow: auto;
		padding-top: 30px;

		.menu-item {
			cursor: pointer;
			transition: all 0.2s ease;
			max-width: 100%;
			overflow: hidden;

			&:hover {
				background-color: rgba(255,255,255,0.05);
			}

			&.sub-nav {

				.item {
					position: relative;

					&::after {
						content: ' ';
						position: absolute;
						right: 10px;
						border: 5px solid rgba(255,255,255,1);
						border-right: 0;
						border-top-color: transparent;
						border-bottom-color: transparent;
						top: 50%;
						transform: translateY(-50%);
						transition: all 0.2s ease;
					}
				}
			}

			&.open {
				background-color: rgba(255,255,255,0.08);

				.item {

					&::after {
						transform: translateY(-50%) rotate(90deg);
					}
				}

				.sub-menu {
					background-color: rgba(255,255,255,0.1);
					padding: 10px;
					max-height: none;
				}
			}

			.item {
				padding: 15px 25px 15px 15px;
				border-right: 5px solid transparent;
				display: flex;
				align-items: center;
				justify-content: space-between;
				text-decoration: none;
				max-width: 300px;
				transition: max-width 0.5s ease;
				will-change: max-width;

				&.vertical-image {

					img {
						height: 20px;
					}
				}

				&.active {
					border-right-color: $color-primary;
					background-color: rgba(255,255,255,0.05);

					.icons {
						color: $color-primary;
					}
				}

				.icons {
					color: white;
					margin-left: 0;
					transition: all 0.5s ease;
				}

				p {
					color: white;
					font-weight: 100;
					transition: all 0.5s ease;
					white-space: nowrap;
					overflow: hidden;
					font-size: 14px;
				}
			}

			.sub-menu {
				padding: 0px 45px;
				max-height: 0;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				align-items: flex-end;

				.sub-item {
					font-size: 14px;
					color: white;
					font-weight: 100;
					text-align: right;
					line-height: 30px;
					text-decoration: none;
					width: 100%;

					&.active {
						padding-right: 15px;
						position: relative;

						&::after {
							content: " ";
							height: 8px;
							width: 8px;
							border-radius: 50%;
							background-color: $color-primary;
							position: absolute;
							right: 0px;
							top: 50%;
							transform: translateY( -50% );
						}
					}
				}
			}
		}
	}

	.bottom-bar {
		padding: 7px;
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
		position: relative;

		.toggle {
			height: 30px;
			width: 30px;
			border-radius: 50%;
			background-color: rgba(255,255,255,0.25);
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			transition: all 0.5s ease;

			&::after {
				content: ' ';
				border: 2px solid white;
				border-bottom: 0;
				border-left: 0;
				height: 7px;
				width: 7px;
				position: absolute;
				transform: translateX(1px) rotate(-135deg);
				transition: all 0.5s ease;
			}
		}

		.night-day {
			background-color: rgba(255,255,255,0.25);
			height: 30px;
			width: 30px;
			border-radius: 50%;
			position: absolute;
			cursor: pointer;
			left: 7px;
			bottom: 7px;
			transition: all 0.2s ease;

			&::after {
				content: " ";
				position: absolute;
				top: 50%;
				left: 50%;
				height: 12px;
				width: 12px;
				transform: translate(-50%, -50%) rotate(-45deg);
				border-width: 3px;
				border-style: solid;
				transition: all 0.2s ease;
				border-radius: 50%;
			}

			&::before {
				content: " ";
				position: absolute;
				top: 50%;
				left: 50%;
				height: 6px;
				width: 6px;
				border-radius: 50%;
				transform: translate(-50%, -50%);
				border: 3px dotted rgb(255,240,0);
				transition: all 0.2s ease;
			}

			&.night {

				&::after {
					border-right: 0px solid white;
					border-bottom: 0px solid white;
					background: white;
					border-color: rgba(156,156,156,0.5);
				}
			}

			&.day {

				&::after {
					background: $status-gold;
					border-color: rgb(255, 240, 0);
					border-left: 0px solid white;
					border-top: 0px solid white;
					height: 10px;
					width: 10px;
				}

				&::before {
					height: 15px;
					width: 15px;
				}
			}
		}
	}
}
</style>
