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

			return h - ( t + b );
		},

		aw() { // available width
			const { w, r, l } = this;

			return w - ( r + l );
		}
	},

	beforeDelete() {
		window.removeEventListener( 'resize', this.reset );
	},

	methods : {
		init( svgEl ) {
			this.resetDims();

			this.canvas = d3.select( svgEl );
			this.draw();

			window.addEventListener( 'resize', this.reset, { passive : true } );
		},

		reset() {
			this.canvas.selectAll( '*' ).delete();

			this.draw();
		},

		resetDims() {

			const {
				clientWidth  : w,
				clientHeight : h,
			} = this.$refs.svg;

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
				axis, // eslint-disable-line
				range,
				lines,
				postChar,
				color,
			} = options;

			const {
				numberOfIndicators,
				spaceBetweenLabelsAndLines,
			} = lines;

			/* draw initial lines and indicators */
			const rangeDifference = range.max - range.min;

			/* add text labels */

			const labelData = [];
			for ( let i = 0; i < numberOfIndicators; i++ ) {

				const dominantBaseline = ( () => {
					if ( i === numberOfIndicators - 1 ) {
						return 'text-before-edge';
					}

					if ( i === 0 ) {
						return 'text-after-edge';
					}

					return 'middle';
				} )();

				const y = ( () => {
					const bottomOfChart      = this.t + this.ah;
					const distanceFromBottom = i * ( this.ah / ( numberOfIndicators - 1 ) );

					return bottomOfChart - distanceFromBottom;
				} )();

				labelData.push( {
					y,
					text : `${range.min + ( ( i / ( numberOfIndicators - 1 ) ) * rangeDifference )}${postChar || ''}`,
					dominantBaseline,
				} );

			}

			const lineIndicatorGroups = this.canvas
				.selectAll( `line-indicators-${this.id}` )
				.data( labelData )
				.enter()
				.append( 'g' ) // will append as many g's as the length of labelData
				.attr( 'class', `line-indicators-${this.id}` );

			const lineLabels = lineIndicatorGroups.append( 'text' )
				.attr( 'class', `line-indicators label-${this.id}` )
				.attr( 'dominant-baseline', d => d.dominantBaseline )
				.attr( 'x', this.l )
				.attr( 'y', d => d.y )
				.style( 'font-size', '10px' )
				.style( 'fill', color )
				.text( d => d.text );

			/* right align text */

			const lineLabelWidths  = Array.from( lineLabels._groups[0] ).map( a => a.getBBox().width );
			const biggestLineLabel = Math.max( ...lineLabelWidths );

			lineLabels.attr( 'x', biggestLineLabel )
				.attr( 'text-anchor', 'end' );

			this.updateDims( {
				l : biggestLineLabel + spaceBetweenLabelsAndLines
			} );

			/* draw lines */

			lineIndicatorGroups.append( 'path' )
				.attr( 'd', d => `M ${this.l}, ${d.y} L ${this.l + this.aw}, ${d.y}` )
				.style( 'stroke-dasharray', '2, 4' )
				.style( 'stroke', color );

		},
	}
};
</script>
