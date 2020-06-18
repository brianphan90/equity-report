<template lang="pug">
.all-filters
	.filter-section-container
		.filter-section-wrapper(v-for='( section, sectionIndex ) in localFilters')
			p.section-title {{ section.name }}
			.group(v-for='( group, groupIndex ) in section.groups')
				.group-title {{ group.name }}

				.filter-container
					.filter.bubble(
						v-for='( filter, filterIndex ) in group.filters'
						:class='[ filter.class, { grey: !filter.active }]'
						@click='setFilter( sectionIndex, groupIndex, filterIndex )'
					)
						p {{ filter.name }}
</template>

<script>
export default {
	name : 'all-filters',

	props : {

		filters : {
			type : Array,
		},

	},

	computed : {

		localFilters() {

			const copiedFilters = [...this.filters];

			this.filters.forEach( ( filter, filterIndex ) => {

				filter.groups.forEach( ( group, groupIndex ) => {

					const localFilterGroup = copiedFilters[filterIndex].groups[groupIndex];

					localFilterGroup.filters.unshift( group.default );

				} );

			} );

			return copiedFilters;

		},

	},

	methods : {

		setFilter( sectionIndex, groupIndex, filterIndex ) {

			this.$emit( 'set-active-filter', [sectionIndex, groupIndex, filterIndex] );

		},

	},

};
</script>

<style lang="scss">
.all-filters {

	.filter-section-container {
		display: flex;
		flex-flow: row nowrap;
		overflow: auto;

		.filter-section-wrapper {
			margin: 0 25px;

			.section-title {
				font-size: 16px;
				color: $color-secondary;
				text-align: left;
				font-weight: 300;
				margin-bottom: 25px;
			}

			.group {
				margin-bottom: 25px;

				.group-title {
					color: $color-secondary;
					width: 100%;
					text-align: left;
					font-size: 12px;
					font-weight: 100;
					margin-bottom: 5px;
				}

				.filter {
					margin-right: 5px;
					margin-bottom: 5px;
					flex: 1 0 25px;
					cursor: pointer;

					&.two {
						flex: 2 0 50px;
					}

					&.grey {
						background: $background-alternative;
					}

					p {
						width: 100%;
						text-align: center;
						white-space: pre;
						font-size: 12px;
					}
				}
			}
		}
	}
}
</style>
