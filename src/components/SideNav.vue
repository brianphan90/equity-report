<template lang="pug">
aside.side-nav(:class='[viewMode, navState]')
	.collapse-nav
		.icons
			div.icon.dynamic-mode-text(
				v-for='item in nav'
				:class='`icon-${item.icon}`'
				@click='selectIcon( item )'
			)
	.nav-menu
		.menu-item(
			v-for='( item ) in nav'
			:class='{ "sub-nav" : item.children.length, open : open[item.path], closed : !open[item.path] }'
		)
			.item(
				@click='selectMenuItem( item )'
				v-if='item.type != "link"'
			)
				h1 {{ item.title }}
				p.sub-text(v-if='open[item.path]') Click to Minimize
				p.sub-text(v-else) Click to Expand

			nav-items.sub-menu(:items='item.children')

	.bottom-bar
		.toggle(@click='toggleNavState')
		.btn(@click='nextPage()')
				p NEXT
		.night-day.no-select(:class='viewMode' @click='toggleViewMode')
</template>

<script>
import routes from '@/router/routes';

const formatNavRoutes = ( routerInfo, basePath ) => {
	const menuItems = routerInfo.filter( ( info ) => {
		const { meta } = info;
		if ( !meta ) {
			return true;
		}

		console.log( meta.display );

		return meta.display !== false;
	} ).map( ( info ) => {
		const { path : pathProp } = info;
		const path                = basePath ? `${basePath}/${pathProp}` : pathProp;
		const item                = {
			path
		};
		if ( info.meta ) {
			const metaKeys = Object.keys( info.meta.navOptions );
			metaKeys.forEach( ( key ) => {
				item[key] = info.meta.navOptions[key];
			} );
		}

		if ( info.children ) {
			item.children = formatNavRoutes( info.children, path );
		}
		console.log( item );
		return item;
	} );
	console.log( menuItems );
	return menuItems.sort( ( a, b ) => ( a.order - b.order ) );
};

export default {
	name : 'side-nav',

	data : () => ( {
		curNode  : null,
		navState : localStorage.getItem( 'musd-equity-report:nav-state' ) || 'open',
		viewMode : localStorage.getItem( 'musd-equity-report:view-mode' ) || 'night',

		nav  : formatNavRoutes( routes[0].children ), // academics, climate-and-engagement
		open : ( () => {
			const navItemsState = localStorage.getItem( 'musd-equity-report:nav-items-state' );

			if ( navItemsState ) {
				return JSON.parse( navItemsState );
			}

			return routes[0].children.reduce( ( obj, item ) => {
				const added = {};
				added[item.path] = false;

				return {
					...obj,
					...added,
				};
			}, {} );
		} )(),

		closeTimeout : {},
	} ),

	computed : {

		user() {
			return this.$store.state.user;
		},

		pagePath() {
			return this.$route.path;
		}
	},

	watch : {

		open : {
			deep : true,
			handler() {
				localStorage.setItem( 'musd-equity-report:nav-items-state', JSON.stringify( this.open ) );
			}
		},

		navState() {
			localStorage.setItem( 'musd-equity-report:nav-state', this.navState );
		},

		viewMode : {
			immediate : true,
			handler( viewMode ) {
				localStorage.setItem( 'musd-equity-report:view-mode', this.viewMode );
				this.$store.dispatch( 'setMode', viewMode );
			}
		},

	},

	methods : {

		selectMenuItem( item ) {
			console.log( 'set menu item', item.path );
			if ( this.open[item.path] && this.navState === 'open' ) {
				this.open[item.path] = false;

				return;
			}

			const menuItemKeys = Object.keys( this.open );
			menuItemKeys.forEach( ( key ) => {
				this.open[key] = false;
			} );
			this.open[item.path] = true;
		},

		toggleNavState() {
			if ( this.navState === 'open' ) {
				this.navState = 'closed';

				return;
			}

			this.navState = 'open';
		},

		toggleViewMode() {
			console.log( this.$router.history.current.path );
			if ( this.viewMode === 'day' ) {
				this.viewMode = 'night';

				return;
			}

			this.viewMode = 'day';
		},

		selectIcon( item ) {
			this.selectMenuItem( item );
			this.toggleNavState();
		},

		log( message ) {
			console.log( message );
		},
		nextPage() {
			const curPath = this.$router.history.current.path;
			const retArray = [];
			const rootPaths = [];
			let magicIndex = -1;
			let finalIndex = -1;
			let prevCategory = null;
			this.nav.forEach( ( item ) => {
				rootPaths.push( item.path );
				item.children.forEach( child => child.children.forEach( ( grandChild ) => {
					magicIndex++;
					if ( !prevCategory ) {
						prevCategory = item.icon;
					}
					else if ( prevCategory !== item.icon ) {
						console.log( magicIndex - 1 );
						finalIndex = magicIndex - 1;
						prevCategory = item.icon;
					}
					retArray.push( grandChild );
					return null;
				} ) );
			} );
			const curIndex = retArray.findIndex( element => element.path === curPath );
			if ( curIndex < retArray.length - 1 ) {
				this.$router.push( retArray[curIndex + 1].path );
				if ( curIndex === finalIndex ) {	// temporary (scalable)
					this.open[rootPaths[0]] = false; //	/academics
					this.open[rootPaths[1]] = true; //	/climate-and-engagement
				}
			}
			else {
				console.log( 'end' );
				this.$router.push( retArray[0].path );
				this.open[rootPaths[0]] = true; //	/academics
				this.open[rootPaths[1]] = false; //	/climate-and-engagement
			}
			console.log( retArray );
		}

	},

	components : {
		NavItems : () => import( '@/components/NavItems' ),
	}

};
</script>

<style lang="scss">
.side-nav {
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
		background-image: linear-gradient(180deg, rgba(159, 206, 209, 0.26) 0%, #EACDA9 100%);

		.nav-menu {

			.menu-item {

				&::hover {
					background-color: rgba(0,0,0,0.04);
				}

				.item {

					&.active {
						background-color: rgba(0,0,0,0.08);
					}

					h1,
					p {
						color: $color-neutral-dark;
					}
				}

				&.open {

					.item {
						background-color: rgba(0,0,0,0.06);

						&.active {
							background-color: rgba(0,0,0,0.08);
						}
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
			display: none;

			.menu-item {
				position: relative;
				background-color: transparent !important;

				&:hover {

					.item {
						background-color: rgba(255,255,255,0.1);
					}
				}

				&.open {
					overflow: visible;

					.item{
						border-right-color: transparent !important;
					}
				}

				.item {
					padding: 15px;
					overflow: hidden;
					max-width: 45px;

					&:not(.active):not(:hover) {
						background-color: transparent !important;
					}

					p,
					.nav-items {
						opacity: 0;
					}
				}
			}
		}

		.collapse-nav {
			flex: 1 1 0;
			display: flex;
			flex-direction: column;
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
		display: flex;
		flex-direction: column;

		> .menu-item {
			cursor: pointer;
			transition: all 0.2s ease;
			max-width: 100%;
			flex: 1 1 0;
			display: flex;
			flex-direction: column;
			overflow: hidden;

			> .nav-items {
				flex: 1 1 0;
				overflow: auto;
			}

			&.closed {
				flex: 0 0 auto;

				.sub-menu {
					max-height: 0;
					opacity: 0;
					padding: 0 30px 0 50px;
				}
			}

			.sub-menu {
				max-height: 1000px;
				opacity: 1;
				transition: max-height 0.2s ease, opacity 0.2s ease, padding 0.2s ease;
			}

			&:hover {
				background-color: rgba(255,255,255,0.05);
			}

			&.open {
				background-color: rgba(255,255,255,0.08);
			}

			> .item {
				text-decoration: none;
				max-width: 300px;
				transition: max-width 0.5s ease;
				will-change: max-width;
				padding: 15px 23px;

				h1,
				p {
					color: $background-primary;
					font-weight: 600;
					transition: all 0.5s ease;
					text-align: left;
				}

				h1 {
					max-width: 240px;
					font-size: 24px;
				}

				p {
					margin-top: 5px;
					font-size: 12px;
					text-transform: uppercase;
					letter-spacing: 2px;
				}
			}
		}
	}

	.collapse-nav {
		display: none;
		padding-top: 30px;

		.icons {

			.icon {
				padding: 10px;
				font-size: 20px;
				cursor: pointer;
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
		.btn{
				cursor: pointer;
				font-style: normal;
				line-height: 18px;
				font-weight: Bold;
				letter-spacing: 0.15em;
				display: flex;
				padding-left: 20px;
				padding-top: 10px;
				padding-bottom: 10px;
				margin-left: 90px;
				background: linear-gradient(89.75deg, #D8A556 -1.35%, #C07F1A 102.1%);
				box-shadow: 0px 1px 15px rgba(0, 52, 79, 0.2), 0px 1px 3px rgba(0, 52, 79, 0.2);
				border-radius: 10px;
				justify-content: center;
				align-items: center;
				flex : 0 0 auto;
				p {
					color : white;
					font-size: 20px;
				}
			}
	}
}
</style>
