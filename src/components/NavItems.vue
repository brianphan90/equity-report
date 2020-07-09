<template lang='pug'>
.nav-items
	nav-item(
		v-for='item in items'
		:item='item'
	)
</template>

<script>
export default {
	name : 'nav-items',

	props : {
		items : {
			type : Array,
		}
	},

	components : {
		NavItem : () => import( '@/components/NavItem' ),
	}
};
</script>

<style lang='scss'>

.day .nav-items .nav-item {

	&::before {
		background: $color-neutral-dark;
	}

	a {
		color: $color-neutral-dark;
	}
}

.nav-items {
	padding: 30px 30px 30px 50px;
	position: relative;

	.nav-item:nth-last-child(1) {
		margin-bottom: 30px;
	}

	.nav-item {
		position: relative;

		&::before {
			content: ' ';
			height: calc(100% + 50px);
			width: 4px;
			border-radius: 2px;
			background: rgba($color-neutral-light, .6);
			position: absolute;
			top: 0;
			left: -25px;
			transform: translate(-50%,-25px);
			z-index: 1;
		}

		a {
			z-index: 2;
			color: $color-neutral-light;
		}
	}

	.nav-items {
		padding: 0;

		.nav-item {
			margin-bottom: 0;

			&::before {
				display: none;
			}
		}
	}
}
</style>
