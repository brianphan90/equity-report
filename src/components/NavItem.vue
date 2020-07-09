<template lang='pug'>
.nav-item(:class='{ "has-children" : item.children }')
	router-link(:to='item.path') {{ item.title }}
	nav-items(
		v-if='item.children'
		:items='item.children'
	)
</template>

<script>
export default {
	name  : 'nav-item',
	props : {
		item : {
			type : Object,
		}
	},
	components : {
		NavItems : () => import( '@/components/NavItems' ),
	}
};
</script>

<style lang='scss'>
.day {

	.nav-item {
		color: $background-secondary;
	}
}

.nav-item {
	text-align: left;
	color: $background-primary;
	padding: 7px 0;

	+ .has-children {
		margin-top: 45px;
	}

	.nav-item {

		a {
			font-size: 16px;

			&::before {
				height: 10px;
				width: 10px;
			}
		}
	}

	a {
		position: relative;
		font-weight: 600;
		color: $color-neutral-dark;
		font-size: 24px;
		font-family: "Roboto Condensed";

		&::before {
			content: ' ';
			height: 19px;
			width: 19px;
			border-radius: 50%;
			border: 5px solid $color-neutral-medium;
			background: $color-neutral-light;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translate(calc(-50% - 25px),-50%);
		}
	}

	&:nth-child(1) {
		margin-top: 10px;
	}
}
</style>
