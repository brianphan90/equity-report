<template lang="pug">
.year-filters
	.year-filter.bubble(
		v-for='year in yearFilters'
		:class='{ "active" : ( year.value === activeYear ) }'
		@click='selectYear( year )'
	)
		p {{ year.text }}
</template>

<script>
export default {
	name : 'year-filters',

	props : {

		yearFilters : {
			type : Array,
		},

		activeYear : {
			type : [Number, String],
		},

	},

	methods : {

		selectYear( year ) {

			this.$emit( 'selected-year', year.value );

		},

	},
};
</script>

<style lang="scss">
.year-filters {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;

	.year-filter {
		background: $background-alternative;
		margin-right: 5px;
		font-size: 12px;
		cursor: pointer;

		&.active {
			background: $color-primary;
		}

		p {
			font-size: 12px;
		}
	}
}
</style>
