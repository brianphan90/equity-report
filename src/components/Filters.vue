<template lang="pug">
.filters
	.filter-container(:class='{ "active" : isFiltersToggled }')

		.all-filters-container
			.title-container
				p.all-filters-title Filters
				.close-button.bubble(@click='toggleFilter')
					.icon-close
					p Close
			all-filters(
				:filters='filters'
				@set-active-filter='activateFilter'
			)

		.filter-wrapper
			.toggle-filters
				.all-filters-title-container
					p.all-filters-title Filters
					.arrow-icon(@click='toggleFilter')

			.active-filters-container
				p.clear-filters.bubble(@click='clearFilters') Clear All
					span.icon-close

				active-filters(
					:active-filters='activeFilters'
					@remove-filter='activateFilter'
				)

		.year-container
			p.year-title Year:

			year-filters(
				:year-filters='yearFilters'
				:active-year='activeYear'
				@selected-year='setActiveYear'
			)

		.todays-date-container
			p.date-title Today's date:
			p.todays-date.bubble {{ todaysDate }}

</template>

<script>
/* eslint-disable no-param-reassign */

import Filters from '@/assets/js/filters';

import { GetYears } from '@/lib/API';
import { Months, Days } from '@/assets/js/utils';

export default {
	name : 'filters',

	data : () => ( {

		filters : Filters,

		yearFilters : [],
		activeYear  : '',

		isFiltersToggled : false,

		activeFilters : [],

	} ),

	created() {

		GetYears()
			.then( ( years ) => {

				const filters = years.map( a => ( {
					text    : a.label,
					value   : a.value,
					orderBy : a.orderBy,
				} ) );

				this.yearFilters = filters.sort( ( a, b ) => b.orderBy - a.orderBy );
				this.activeYear = this.yearFilters[this.yearFilters.length - 1].value;

				this.loading = false;

			} )
			.catch( console.error );

		// document.querySelector( '.side-nav' ).addEventListener( 'resize', () => {

		// 	const $activeFilters = document.querySelector( '.active-filters' );

		// 	this.showArrows = ( $activeFilters.clientWidth < $activeFilters.scrollWidth );

		// } );

		const stringifiedFilters = this.$store.state.filters;
		const { activeYear }     = this.$store.state;

		this.filterGroups = stringifiedFilters;

		if ( activeYear ) {
			this.activeYear = parseInt( activeYear, 10 );
		}

		let activeFilters = [];

		this.filters.forEach( ( filterGroup ) => {

			const groups = filterGroup.groups.filter( ( a ) => {

				const hasActiveFilter = a.filters.find( b => b.active );

				a.default.active = !hasActiveFilter;

				return hasActiveFilter;

			} );

			activeFilters = activeFilters.concat( groups );

		} );

		this.activeFilters = activeFilters;

	},

	computed : {

		todaysDate() {

			const rightNow = new Date();
			const day      = Days[rightNow.getDay()];
			const month    = Months[rightNow.getMonth()];
			const date     = rightNow.getDate();
			const year     = rightNow.getFullYear();

			return `${day}, ${month} ${date}, ${year}`;

		},

		displayedActiveFilters() {

			return this.activeFilters.reduce( ( displayedFilters, filter ) => {

				if ( filter.filters.length > 0 ) {
					displayedFilters.push( filter );
				}

				return displayedFilters;

			}, [] );

		},

	},

	watch : {

		'$store.state.selectedSchoolValue' : {
			immediate : true,
			handler() {
				this.loadVizData();
			}
		},

		activeYear() {

			this.loadVizData();

		},

		'filters' : {
			immediate : true,
			deep      : true,
			handler( val ) {

				if ( !val ) {
					return;
				}

				this.setActiveFilters();

			}
		}

	},

	methods : {

		setActiveFilters() {

			const activeFilters = [];

			this.filters.forEach( ( section, sectionIndex ) => {

				section.groups.forEach( ( group, groupIndex ) => {

					// get all of the active filters for a group so long as they're
					// not the default value for the group.
					const localActiveFilters = group.filters.reduce( ( filters, filter ) => {

						if ( filter.active && filter.value !== group.default.value ) {
							filters.push( filter );
						}

						return filters;

					}, [] );

					if ( localActiveFilters.length > 0 ) {

						activeFilters.push( {
							sectionIndex,
							groupIndex,
							groupName : group.name,
							filters   : localActiveFilters,
						} );

					}

				} );

			} );

			this.activeFilters = activeFilters;

		},

		getFilters() {

			const groups = this.filters.reduce( ( a, b ) => a.concat( b.groups ), [] );
			const formattedFilters = {};

			groups.forEach( ( group ) => {

				let value = null;

				switch ( group.valueType ) {

					case 'array':

						value = group.default.active ? [group.default.value] : [];
						value = value.concat( group.filters.filter( a => a.active ).map( a => a.value ) );

						break;

					case 'string':

						if ( group.default.active ) {

							value = group.default.value; // eslint-disable-line

						}

						else {

							const active = group.filters.find( a => a.active );

							if ( !active ) {
								value = group.default.value; // eslint-disable-line
							}

							else {
								value = active.value; // eslint-disable-line
							}

						}

						break;

					default:
						console.error( 'no value type specified for filer' );
						break;

				}

				formattedFilters[group.key] = value;

			} );

			return formattedFilters;

		},

		clearFilters() {
			// clear the filters
		},

		activateFilter( [sectionIndex, groupIndex, filterIndex] ) {

			const groupSection  = this.filters[sectionIndex].groups[groupIndex];
			const filterSection = groupSection.filters;

			const { default : defaultVal } = groupSection;
			const indexOfDefault           = filterSection.findIndex( a => ( a === defaultVal ) );

			let hasActiveFilter   = false;
			let defaultIsSelected = false;

			filterSection.forEach( ( filter, index ) => {

				// if the default is selected, turn off the rest of the
				// filters
				if ( defaultIsSelected ) {
					this.$set( filterSection[index], 'active', false );
					return;
				}

				// this is the filter that was toggled
				if ( filterIndex === index ) {

					// if the user selected the default value
					if ( filter.value === defaultVal.value ) {

						defaultIsSelected = true;

						filterSection[indexOfDefault].active = true;

						return;

					}

					filterSection[indexOfDefault].active = false;

					// if the selected filter was already active, that means
					// the user wants to turn off the filter
					if ( filter.active ) {

						this.$set( filterSection[index], 'active', false );

						return;

					}

					// turn on the filter
					this.$set( filterSection[index], 'active', true );

					hasActiveFilter = true;

				}

				// if there are already some filters activated, set the
				// hasActiveFilter variable so that we don't try to overwrite
				// the activated filter with the default value, you can find
				// this code block after the parents scope
				if ( filter.active ) {
					hasActiveFilter = true;
				}

			} );

			// if no filters are toggled, use the default filter
			if ( !hasActiveFilter ) {
				this.$set( filterSection[indexOfDefault], 'active', true );
			}

		},

		loadVizData() {

			// load the visual data

		},

		toggleFilter() {
			this.isFiltersToggled = !this.isFiltersToggled;
		},

		setActiveYear( year ) {
			this.activeYear = year;
		},

	},

	components : {
		ActiveFilters : () => import( '@/components/filters/ActiveFilters' ),
		AllFilters    : () => import( '@/components/filters/AllFilters' ),
		YearFilters   : () => import( '@/components/filters/YearFilters' ),
	},
};
</script>

<style lang="scss">
.filters {
	padding: 0 30px;

	> .filter-container {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		//- this positioning is located in Home so that the all
		//- filters container has a max height of the viewable
		//- screen and not of the filters top bar
		//- position: relative;
		padding: 5px 0;

		&.active {

			.filter-wrapper {

				.toggle-filters {

					.all-filters-title-container {

						.arrow-icon {
							transform: rotate( 90deg );
						}
					}
				}
			}

			.all-filters-container {
				transform: translate3d( -50%, 0%, 0 );
			}
		}

		> * {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
		}

		.all-filters-container {
			position: absolute;
			width: max-content;
			max-width: 95%;
			max-height: 100%;
			overflow-y: auto;
			z-index: 5;
			left: 50%;
			top: 0;
			display: flex;
			flex-flow: column;
			background: $background-primary;
			border-radius: 3px;
			box-shadow: $secondaryBoxShadow;
			-webkit-font-smoothing: subpixel-antialiased;
			transform: translate3d( -50%, -1000px, 0 );
			transition: .3s transform ease-in;

			.title-container {
				width: 100%;
				display: flex;
				flex-flow: row wrap;
				align-items: center;
				justify-content: space-between;
				padding: 25px;

				.all-filters-title {
					font-size: 18px;
					font-weight: 300;
					color: $color-secondary;
				}

				.close-button {
					background: $status-red;
					cursor: pointer;

					.icon-close {

						&::before, &::after {
							background: white;
						}
					}

					p {
						text-transform: uppercase;
						font-size: 12px;
						margin-right: 5px;
					}
				}
			}
		}

		.filter-wrapper {

			.toggle-filters {
				position: relative;

				.all-filters-title-container {

					.all-filters-title {
						display: inline-block;
						margin-right: 5px;
						color: $color-secondary;
						font-size: 14px;
						font-weight: 300;
					}

					.arrow-icon {
						margin-left: 5px;
						display: inline-block;
						border-top: 5px solid transparent;
						border-bottom: 5px solid transparent;
						border-left: 5px solid $color-secondary;
						width: 10px;
						height: 10px;
						cursor: pointer;
						transform-origin: 50% 50%;
						transition: transform .15s ease-in;
					}
				}
			}

			.active-filters-container {
				margin-left: 25px;
				display: flex;
				flex-flow: row nowrap;

				.clear-filters {
					background: $background-alternative;
					font-size: 12px;
				}
			}
		}

		.year-container {
			margin-left: auto;

			.year-title {
				font-weight: 300;
				font-size: 14px;
				margin-right: 5px;
			}
		}

		.todays-date-container {
			margin-left: 15px;

			.date-title {
				font-size: 14px;
				font-weight: 300;
			}

			.todays-date {
				background: $background-alternative;
				font-size: 12px;
				font-weight: 300;
				margin-left: 5px;
			}
		}
	}
}
</style>
