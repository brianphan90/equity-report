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
				)

		.year-container
			p.year-title Year:

			year-filters(
				:year-filters='yearFilters'
			)

		.todays-date-container
			p.date-title Today's date: {{ todaysDate }}

</template>

<script>
/* eslint-disable no-param-reassign */

import { GetYears } from '@/lib/API';
import { Months, Days } from '@/assets/js/utils';

export default {
	name : 'filters',

	data : () => ( {

		filters : [
			{
				name   : 'Demographics',
				groups : [
					{
						name      : 'Grade Level',
						key       : 'gradeLevels',
						valueType : 'array',

						default : {
							name   : 'All',
							value  : 'All',
							class  : 'two',
							active : true,
						},

						filters : [
							{
								name   : 'TK',
								value  : 'gradeTK',
								active : false
							},
							{
								name   : 'K',
								value  : 'gradeK',
								active : false
							},
							{
								name   : '1',
								value  : 'grade1',
								active : false
							},
							{
								name   : '2',
								value  : 'grade2',
								active : false
							},
							{
								name   : '3',
								value  : 'grade3',
								active : false
							},
							{
								name   : '4',
								value  : 'grade4',
								active : false
							},
							{
								name   : '5',
								value  : 'grade5',
								active : false
							},
							{
								name   : '6',
								value  : 'grade6',
								active : false
							},
							{
								name   : '7',
								value  : 'grade7',
								active : false
							},
							{
								name   : '8',
								value  : 'grade8',
								active : false
							},
							{
								name   : '9',
								value  : 'grade9',
								active : false
							},
							{
								name   : '10',
								value  : 'grade10',
								active : false
							},
							{
								name   : '11',
								value  : 'grade11',
								active : false
							},
							{
								name   : '12',
								value  : 'grade12',
								active : false
							}
						]
					},
					{
						name      : 'Gender',
						key       : 'gender',
						valueType : 'string',

						default : {
							name   : 'Both',
							value  : 'Both',
							class  : 'flex',
							active : true
						},
						filters : [
							{
								name   : 'Male',
								value  : 'male',
								class  : 'flex',
								active : false
							},
							{
								name   : 'Female',
								value  : 'female',
								class  : 'flex',
								active : false
							}
						]
					},
					{
						name      : 'Race',
						key       : 'race',
						valueType : 'array',

						default : {
							name   : 'All',
							value  : 'All',
							class  : 'flex',
							active : true
						},
						filters : [
							{
								name   : 'Hispanic',
								value  : 'hispanic',
								class  : 'flex',
								active : false
							},
							{
								name   : 'White',
								value  : 'white',
								class  : 'flex',
								active : false
							},
							{
								name   : 'Black/AA',
								value  : 'black',
								class  : 'flex',
								active : false
							},
							{
								name   : 'Asian',
								value  : 'asian',
								class  : 'flex',
								active : false
							},
							{
								name   : 'Filipino',
								value  : 'filipino',
								class  : 'flex',
								active : false
							},
							{
								name   : 'A. Indian',
								value  : 'amIndian',
								class  : 'flex',
								active : false
							},
							{
								name   : 'P. Islander',
								value  : 'pacIslander',
								class  : 'flex',
								active : false
							},
							{
								name   : '2 or More',
								value  : 'twoOrMore',
								class  : 'flex',
								active : false
							},
							{
								name   : 'UNS',
								value  : 'declined',
								class  : 'flex',
								active : false
							}
						]
					}
				]
			},
			{
				name   : 'Programs',
				groups : [
					{
						name      : 'Language Fluency',
						key       : 'languageFluency',
						valueType : 'array',

						default : {
							name   : 'All',
							value  : 'All',
							class  : 'flex',
							active : true
						},
						filters : [
							{
								name   : 'EO',
								value  : 'englishOnly',
								class  : 'flex',
								active : false
							},
							{
								name   : 'IFEP',
								value  : 'IFEP',
								class  : 'flex',
								active : false
							},
							{
								name   : 'EL',
								value  : 'englishLearner',
								class  : 'flex',
								active : false
							},
							{
								name   : 'LTEL',
								value  : 'LTEL',
								class  : 'flex',
								active : false
							},
							{
								name   : 'RFEP',
								value  : 'RFEP',
								class  : 'flex',
								active : false
							},
							{
								name   : 'TBD',
								value  : 'toBeDecided',
								class  : 'flex',
								active : false
							}
						]
					},
					{
						name      : 'Socioeconomically Disadvantaged (SED)',
						key       : 'lowIncome',
						valueType : 'string',

						default : {
							name   : 'Both',
							value  : 'Both',
							class  : 'flex',
							active : true
						},
						filters : [
							{
								name   : 'Non-SED',
								value  : 'nonLowIncome',
								class  : 'flex',
								active : false
							},
							{
								name   : 'SED',
								value  : 'lowIncome',
								class  : 'flex',
								active : false
							}
						]
					},
					{
						name      : 'Foster Youth (FY)',
						key       : 'foster',
						valueType : 'string',

						default : {
							name   : 'Both',
							value  : 'Both',
							class  : 'flex',
							active : true
						},
						filters : [
							{
								name   : 'Non-FY',
								value  : 'nonFoster',
								class  : 'flex',
								active : false
							},
							{
								name   : 'FY',
								value  : 'foster',
								class  : 'flex',
								active : false
							}
						]
					},
					{
						name      : 'Homeless (HL)',
						key   		  : 'homeless',
						valueType : 'string',

						default : {
							name   : 'Both',
							value  : 'Both',
							class  : 'flex',
							active : true
						},
						filters : [
							{
								name   : 'Non-HL',
								value  : 'nonHomeless',
								class  : 'flex',
								active : false
							},
							{
								name   : 'HL',
								value  : 'homeless',
								class  : 'flex',
								active : false
							}
						]
					},
					{
						name      : 'Migrant (MIG)',
						key       : 'migrant',
						valueType : 'string',

						default : {
							name   : 'Both',
							value  : 'Both',
							class  : 'flex',
							active : true
						},
						filters : [
							{
								name   : 'Non-MIG',
								value  : 'nonMigrant',
								class  : 'flex',
								active : false
							},
							{
								name   : 'MIG',
								value  : 'migrant',
								class  : 'flex',
								active : false
							}
						]
					}
				]
			},
			{
				name   : 'Special Education',
				groups : [
					{
						name      : 'Students with Disabilities (SWD)',
						key       : 'disabilities',
						valueType : 'string',

						default : {
							name   : 'Both',
							value  : 'Both',
							class  : 'flex',
							active : true
						},
						filters : [
							{
								name   : 'Non-SWD',
								value  : 'nonSped',
								class  : 'flex',
								active : false
							},
							{
								name   : 'SWD',
								value  : 'sped',
								class  : 'flex',
								active : false
							}
						]
					},
					{
						name      : '504 Accomodations',
						key       : 'accommodations',
						valueType : 'string',

						default : {
							name   : 'Both',
							value  : 'Both',
							class  : 'flex',
							active : true
						},
						filters : [
							{
								name   : 'Non-504',
								value  : 'nonAccomodations',
								class  : 'flex',
								active : false
							},
							{
								name   : '504',
								value  : 'accomodations',
								class  : 'flex',
								active : false
							}
						]
					}
				]
			}
		],

		yearFilters : [],
		activeYear  : 2,

		isFiltersToggled : false,

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

				this.loading = false;

			} )
			.catch( console.error );

		document.querySelector( '.side-nav' ).addEventListener( 'resize', () => {

			const $activeFilters = document.querySelector( '.active-filters' );

			this.showArrows = ( $activeFilters.clientWidth < $activeFilters.scrollWidth );

		} );

		const stringifiedFilters = this.$store.state.filters;
		const { activeYear }     = this.$store.state;

		this.filterGroups = stringifiedFilters;

		if ( activeYear ) {
			this.activeYear = parseInt( activeYear, 10 );
		}

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

		activeFilters() {

			let activeFilters = [];

			this.filterGroups.forEach( ( filterGroup ) => {

				const groups = filterGroup.groups.filter( ( a ) => {

					const hasActiveFilter = a.filters.findIndex( b => b.active ) > -1;

					a.default.active = !hasActiveFilter;

					return hasActiveFilter;

				} );

				activeFilters = activeFilters.concat( groups );

			} );

			return activeFilters;

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

	},

	methods : {

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

			const filterSection = this.filters[sectionIndex].groups[groupIndex].filters;

			filterSection.forEach( ( filter, index ) => {

				if ( filterIndex === index ) {

					filterSection[filterIndex].active = true;

					return;

				}

				if ( filter.active ) {
					filterSection[index].active = false;
				}

			} );

		},

		loadVizData() {

			// load the visual data

		},

		toggleFilter() {
			this.isFiltersToggled = !this.isFiltersToggled;
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

	.filter-container {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		position: relative;

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
			max-width: 80%;
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
				flex-flow: row nowrap;
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
					}

					.arrow-icon {
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
				margin-left: 50px;
				display: flex;
				flex-flow: row nowrap;

				.clear-filters {
					background: $background-alternative;
				}
			}
		}

		.year-container {
			margin-left: auto;
		}
	}
}
</style>
