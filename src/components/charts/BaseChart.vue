<script>
import { v4 as uuid } from 'uuid';
import * as d3 from 'd3';

export default {
	props : {
		data : {
			type : [Array, Object],
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

		modeRequirements : [],
	} ),

	computed : {
		orderedLegend() {
			const legend = Object.keys( this.legend ).map( ( key ) => {
				const value = this.legend[key];
				return {
					key,
					...value
				};
			} );

			return legend.filter( a => a.order !== undefined ).sort( ( a, b ) => a.order - b.order );
		},

		ah() { // available height
			const { h, t, b } = this;

			return h - ( t + b );
		},

		aw() { // available width
			const { w, r, l } = this;

			return w - ( r + l );
		},

		mode() {
			return this.$store.state.user.mode;
		},

	},

	watch : {
		mode( mode ) {
			const prop = ( mode === 'night' ? 'nightColor' : 'dayColor' );

			this.canvas
				.selectAll( `.dynamic-text-${this.id}` )
				.style( 'fill', d => d[prop] );

			this.canvas
				.selectAll( `.dynamic-stroke-${this.id}` )
				.style( 'stroke', d => d[prop] );

			this.modeRequirements.forEach( requirement => this.updateForNewMode( requirement ) );
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
			this.canvas
				.selectAll( '*' )
				.remove();

			this.resetDims();
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

		drawAxisIndicators( options ) {
			const {
				axis, // eslint-disable-line
				range,
				lines,
				postChar,
				nightColor,
				dayColor,
			} = options;

			const color = ( this.mode === 'night' ? nightColor : dayColor );

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

				const textValue = Math.round( range.min + ( ( i / ( numberOfIndicators - 1 ) ) * rangeDifference ) );

				labelData.push( {
					y,
					text : `${textValue}${postChar || ''}`,
					dominantBaseline,
					nightColor,
					dayColor,
				} );

			}

			const lineIndicatorGroups = this.canvas
				.selectAll( `line-indicators-${this.id}` )
				.data( labelData )
				.enter()
				.append( 'g' ) // will append as many g's as the length of labelData
				.attr( 'class', `line-indicators-${this.id}` );

			if ( options.labels !== false ) {

				/* draw line lables */
				const lineLabels = lineIndicatorGroups.append( 'text' )
					.attr( 'class', `line-indicators label-${this.id} dynamic-text-${this.id}` )
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

			}

			/* draw lines */

			lineIndicatorGroups.append( 'path' )
				.attr( 'd', d => `M ${this.l}, ${d.y} L ${this.l + this.aw}, ${d.y}` )
				.attr( 'class', `dynamic-stroke-${this.id}` )
				.style( 'stroke-dasharray', '2, 4' )
				.style( 'stroke', color );

			return lineIndicatorGroups;

		},

		getDataRange( yValues, scaled, endMultipler = 1 ) {
			const biggest    = Math.max( ...yValues );
			const smallest   = Math.min( ...yValues );
			const difference = ( biggest - smallest );

			if ( difference === 0 ) {

				let power = 0;

				while ( biggest / ( 10 ** power ) > 10 ) {
					power += 1;
				}

				const increment = 10 ** power;

				return {
					start : scaled ? Math.floor( biggest / increment ) * increment : 0,
					end   : Math.ceil( biggest / increment ) * increment,
				};

			}

			// factor of ten to multiply
			// for the label's scale
			const scale = ( () => {

				let power = 0;

				while ( difference / ( 10 ** power ) > 10 ) {
					power += 1;
				}

				return power;

			} )();
			const relevantIncrement =  10 ** scale;

			// we'll start by trying to do a
			// scale from the closest instance of
			// our relevant increment to a point
			// four more relevantIncrements away
			const start = !scaled ? 0 : ( Math.floor( smallest / relevantIncrement ) * relevantIncrement );
			const range = ( Math.ceil( ( difference + smallest - start ) / relevantIncrement ) ) * relevantIncrement;
			const end   = ( start + range ) * endMultipler;

			return {
				start,
				end,
			};
		},

		changeWithMode( requirements ) {
			this.modeRequirements.push( requirements );

			this.updateForNewMode( requirements );
		},

		updateForNewMode( requirements ) {
			const {
				nodes,
				options,
			} = requirements;

			const activeOptions = options[this.mode];

			if ( !activeOptions ) {
				return;
			}

			const optionKeys = Object.keys( activeOptions );
			optionKeys.forEach( ( key ) => {
				if ( typeof nodes[key] !== 'function' ) {
					throw new Error( `Invalid option key: "${key}"` );
				}

				const paramGroups = activeOptions[key];
				paramGroups.forEach( ( group ) => {
					// apply the settings
					nodes[key]( ...group );
				} );
			} );
		},

		wrapText( text, width ) {

			const nodes = Array.from( text._groups[0] );

			nodes.forEach( ( node ) => {
				const textNode   = d3.select( node );
				const totalWords = textNode
					.text()
					.split( /\s+/ )
					.reverse();

				const lineHeight = 1.1; // ems
				const y          = textNode.attr( 'y' );
				const x          = textNode.attr( 'x' );
				const dy         = parseFloat( textNode.attr( 'dy' ) ) || 0;

				let tspan = textNode
					.text( null )
					.append( 'tspan' )
					.attr( 'x', x )
					.attr( 'y', y )
					.attr( 'dy', `${dy}em` );

				let line       = [];
				let lineNumber = 0;
				while ( totalWords.length ) {
					const word = totalWords.pop();

					// add this word to the line
					line.push( word );

					// set the tspan's content to
					// the value of our line
					tspan.text( line.join( ' ' ) );

					// determine if the line is now
					// overflowing
					const textLength = tspan
						.node()
						.getComputedTextLength();

					const overflowing = textLength > width;

					if ( overflowing ) {
						// remove that word, as it was
						// too long
						line.pop();

						// reset the text to the line without
						// the word that overflowed
						tspan.text( line.join( ' ' ) );

						// put this word in the next line
						line = [word];

						// add a new tsapn
						tspan = textNode
							.append( 'tspan' )
							.attr( 'x', x )
							.attr( 'y', y )
							.attr( 'dy', `${( ++lineNumber * lineHeight ) + dy}em` )
							.text( word );
					}
				}

				textNode.selectAll( 'tspan' )
					.attr( 'dy', ( d, i, tspans ) => {

						const numberOfLines = Array.from( tspans )
							.filter( a => a.innerHTML !== '' )
							.length - 1;

						const tspanNode  = tspans[i];
						const startingDy = parseFloat( d3.select( tspanNode ).attr( 'dy' ), 10 );

						const halfTotalTextHeight = ( ( numberOfLines / 2 ) * lineHeight );
						const linePosition        = ( lineHeight * lineNumber );

						// centers the wrapper text
						return `${( startingDy || 0 ) - linePosition + halfTotalTextHeight}em`;

					} );
			} );
		},

		pathFromPoints( points ) {

			const path = points.reduce( ( a, b, i ) => {

				if ( typeof a !== 'object' ) {
					return `${a} L ${b.x} ${b.y}${i === ( points.length - 1 ) ? ' Z' : ''}`;
				}

				return `M ${b.x} ${b.y}`;

			}, {} );

			return path;

		},
	},
};
</script>
