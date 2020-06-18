<template lang="pug">
.active-filters
	swiper.filter-swiper(
		:options='swiperOptions'
	)
		.arrows-container(slot='arrows')
			.arrow.prev
			.arrow.forward

		.active-filter-container(
			v-for='( filter, index ) in activeFilters'
			:slot='`slot-${index}`'
		)
			p.active-filter.bubble {{ filter }}
				span.icon-close
</template>

<script>
export default {
	name : 'active-filters',

	props : {

		activeFilters : {
			type : [Array, Object],
		},

	},

	computed : {

		swiperOptions() {

			return {
				numberOfSlides : this.activeFilters.length,

				config : {
					// auto initialize this swiper
					init         : true,
					initialSlide : 0,

					// swiper settings
					slidesPerView   : 'auto', // don't force all slides to be 100vw
					speed           : 300, // ms for when you let go of swipe
					spaceBetween    : 0, // no space between
					resistanceRatio : 0, // stops you from swiping past all slides
					direction       : 'horizontal',
					allowTouchMove  : ( window.innerWidth <= 575 ),

					threshold : 50, // min distance for scroll to work

					navigation : {
						prevEl : '.arrow.prev',
						nextEl : '.arrow.next',
					}
				}
			};

		},

	},

	components : {
		Swiper : () => import( '@/components/Swiper' ),
	},

};
</script>

<style lang="scss">
.active-filters {

	.filter-swiper {
		position: relative;

		.arrows-container {
			position: absolute;
			width: 100%;
		}
	}
}
</style>
