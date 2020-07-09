<script>
import { v4 as uuid } from 'uuid';
import * as d3 from 'd3';

export default {
	props : {
		data : {
			type : Object,
		},
		legend : {
			type : Object,
		},
	},

	data : () => ( {
		canvas : null,
		id     : uuid(),
		h      : 0, // height
		w      : 0, // width
		l      : 0, // left offset
		r      : 0, // right offset
		t      : 0, // top offset
		b      : 0, // bottom offset
	} ),

	computed : {
		ah() { // available height
			const { h, t, b } = this;

			return h - t + b;
		},

		aw() { // available width
			const { w, r, l } = this;

			return w - r + l;
		}
	},

	mounted() {
		this.canvas = d3.select( this.$refs.id );
		this.draw();

		window.addEventListener( 'resize', this.reset, { passive : true } );

		this.resetDims();
	},

	beforeDelete() {
		window.removeEventListener( 'resize', this.reset );
	},

	methods : {
		reset() {
			this.canvas.selectAll( '*' ).delete();

			this.draw();
		},

		resetDims() {

			const {
				clientWidth  : w,
				clientHeight : h,
			} = this.$refs.id;

			this.h = h;
			this.w = w;
			this.t = 0;
			this.b = 0;
			this.l = 0;
			this.r = 0;
		},

		updateDims( props ) {
			const keys = Object.keys( props );
			const allowed = {
				t : true,
				b : true,
				l : true,
				r : true,
				h : true,
				w : true,
			};

			keys.forEach( ( key ) => {
				if ( !allowed[key] ) {
					console.warning( `Key ${key} cannot be updated using updateDims()` );

					return;
				}
				this[key] = props[key];
			} );
		},

		getLabelsFromRange( range ) {
		},

		drawAxisIndicators( options ) {
			const {
				axis,
				range,
				lines,
				numberOfIndicators,
			} = options;

			// determine the labels we'll draw,
			// e.g. if we had minValue : 0, and maxValue : 100,
			// we might get back 0, 25, 50, 75, 100
			const labels = this.getLabelsFromRange( range );

			/* draw initial lines and indicators */
			const rangeDifference    = range.max - range.min;
			const getY               = ( i ) => {

				const bottomOfChart      = this.dims.t + this.dims.ch;
				const distanceFromBottom = i * ( this.dims.ch / ( numberOfIndicators - 1 ) );

				return bottomOfChart - distanceFromBottom;

			};

			for ( let i = 0; i < numberOfIndicators; i++ ) {

				const lineIndicator = this.append( 'g' )
					.attr( 'class', `line-indicators indicator-group ${this.id}` );

				lineIndicator.append( 'text' )
					.attr( 'class', `line-indicators label ${this.id}` )
					.attr( 'text-anchor', 'left' )
					.attr( 'dominant-baseline', 'middle' )
					.attr( 'x', this.l )
					.attr( 'y', getY( i ) )
					.style( 'font-size', '10px' )
					.style( 'fill', 'white' )
					.text( range.min + ( ( i / ( numberOfIndicators - 1 ) ) * rangeDifference ) + ( chart.hasOwnProperty( 'postChar' ) ? chart.postChar : '' ) );

			}
		},
	}
};
</script>
