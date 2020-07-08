<template lang='pug'>
.swiper-container(ref='swiperContainer')
	slot(name='arrows')
	slot(name='header')
	.swiper-wrapper
		.swiper-slide(
			v-for='i in options.numberOfSlides'
		)
			slot(:name='`slide-${i}`')

	.swiper-scrollbar(v-if='options.config.scrollbar')
</template>

<script>
import Swiper from 'swiper/js/swiper';
import 'swiper/css/swiper.css';

export default {
	name : 'swiper',

	props : {
		options : {
			/**
			 * {
			 *   numberOfSlides : Number, The number of slides you need in the slider
			 *   config         : Object, SwiperJS config object, (see SwiperJS docs)
			 * }
			 * * Changing the number of slides will automatically update the slider
			 * * and trigger the "init" and "swiper" event with the value of the new
			 * * swiper
			 */
			type     : Object,
			required : true,
		},

		activeSlide : {
			/**
			 * Changing this prop will automatically slide the swiper to the active slide
			 * this is the preferred method of changing the swiper slide
			 */
			type    : Number,
			default : null,
		}
	},

	data : () => ( {
		swiper : null,
	} ),

	mounted() {

		this.initSwiper();

		window.addEventListener( 'resize', this.swiperResized );

	},

	beforeDestroy() {
		this.$emit( 'destroy' );

		window.removeEventListener( 'resize', this.swiperResized );

	},

	watch : {

		activeSlide( slide ) {
			this.swiper.slideTo( slide );
			this.swiper.activeIndex = slide;
		},

		'options.numberOfSlides' : {

			handler( length, lastLength ) {
				this.swiper.destroy( true, false );

				this.$nextTick( () => {
					this.initSwiper();

					// if we added another slide,
					// then slide to the next slide
					if ( length > lastLength ) {
						this.swiper.slideNext();
					}
				} );
			}
		},

	},

	methods : {

		swiperResized() {

			console.log( 'resized' );

			this.swiper = null;
			this.initSwiper();

		},

		initSwiper() {
			const { swiperContainer } = this.$refs;
			this.swiper = new Swiper( swiperContainer, this.options.config );

			this.$emit( 'swiper', this.swiper );

			this.$nextTick( () => {
				const events = [
					'slideChangeTransitionEnd',
				];

				events.forEach( ( event ) => {

					this.swiper.on( event, () => {
						const domFriendlyEvent = event.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();

						this.$emit( domFriendlyEvent, this.swiper );
					} );
				} );

				this.$emit( 'init', this.swiper );
			} );
		}

	}
};
</script>

<style lang='scss'>
</style>
