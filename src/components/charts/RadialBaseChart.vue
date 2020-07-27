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

		svgHeight : 0,
		svgWidth  : 0,

		ir : 0,
		o  : 0,
		r  : 0,

		modeRequirements : [],
	} ),

	computed : {

		or() {
			return this.r - this.o;
		},

		mode() {
			return this.$store.state.user.mode;
		},

		epicenter() {
			return {
				x : ( this.svgWidth / 2 ),
				y : ( this.svgHeight / 2 ),
			};
		}

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

			this.r         = Math.min( w, h ) / 2;
			this.o         = 0;
			this.svgHeight = h;
			this.svgWidth  = w;
			this.i         = 0;
		},

		updateDims( props ) {
			const keys = Object.keys( props );
			const allowed = {
				r  : true,
				ir : true,
				o  : true,
			};

			keys.forEach( ( key ) => {
				if ( !allowed[key] ) {
					console.warning( `Key ${key} cannot be updated using updateDims()` );

					return;
				}
				this[key] = props[key];
			} );
		},

		pointFromCenter( angle, distance ) {
			return this.pointFromPointAndVector( this.epicenter, angle, distance );
		},

		pointFromPointAndVector( origin, angle, distance ) {
			const trueAngle = ( angle - ( Math.PI / 2 ) );

			const x = Math.cos( trueAngle ) * distance;
			const y = Math.sin( trueAngle ) * distance;

			return {
				x : origin.x + ( Math.round( x * 100 ) / 100 ),
				y : origin.y + ( Math.round( y * 100 ) / 100 ),
			};
		},

		distanceBetweenPoints( pointOne, pointTwo ) {
			const {
				x : xOne,
				y : yOne,
			} = pointOne;

			const {
				x : xTwo,
				y : yTwo,
			} = pointTwo;

			const deltaX = ( xTwo - xOne );
			const deltaY = ( yTwo - yOne );

			return Math.sqrt( ( deltaX ** 2 ) + ( deltaY ** 2 ) );
		},

		getOuterMostRadiusOfNodes( d3nodes ) {
			const nodes = Array.from( d3nodes._groups[0] );
			const dims  = nodes.map( node => node.getBBox() );
			const data  = dims.map( ( dim ) => {
				const {
					x,
					y,
					width,
					height
				} = dim;

				const midPoint = {
					x : dim.x + ( dim.width / 2 ),
					y : dim.y + ( dim.height / 2 ),
				};

				const quadrant = this.getQuadrant( midPoint );

				return {
					quadrant,
					x,
					y,
					width,
					height,
				};
			} );

			const outerMostPoints = data.map( ( dim ) => {
				switch ( dim.quadrant ) {

					case ( 1 ): {
						return {
							x : dim.x + dim.width,
							y : dim.y,
						};
					}

					case ( 2 ): {
						return {
							x : dim.x + dim.width,
							y : dim.y + dim.height,
						};
					}

					case ( 3 ): {
						return {
							x : dim.x,
							y : dim.y + dim.height,
						};
					}

					case ( 4 ): {
						return {
							x : dim.x,
							y : dim.y,
						};
					}

					default: {
						throw new Error( `Quadrant must be a number between 1 and 4 (inclusive). Instead got: ${dim.quadrant}` );
					}
				}
			} );

			const outerRadiuses = outerMostPoints.map( point => Math.abs( this.distanceBetweenPoints( this.epicenter, point ) ) );

			return Math.max( ...outerRadiuses );
		},

		getInnerMostRadiusOfNodes( d3nodes ) {
			const nodes = Array.from( d3nodes._groups[0] );
			const dims  = nodes.map( node => node.getBBox() );
			const data  = dims.map( ( dim ) => {
				const {
					x,
					y,
					width,
					height
				} = dim;

				const midPoint = {
					x : dim.x + ( dim.width / 2 ),
					y : dim.y + ( dim.height / 2 ),
				};

				const quadrant = this.getQuadrant( midPoint );

				return {
					quadrant,
					x,
					y,
					width,
					height,
				};
			} );

			const innerMostPoints = data.map( ( dim ) => {
				switch ( dim.quadrant ) {

					case ( 1 ): {
						return {
							x : dim.x,
							y : dim.y + dim.height,
						};
					}

					case ( 2 ): {
						return {
							x : dim.x,
							y : dim.y,
						};
					}

					case ( 3 ): {
						return {
							x : dim.x + dim.width,
							y : dim.y,
						};
					}

					case ( 4 ): {
						return {
							x : dim.x + dim.width,
							y : dim.y + dim.height,
						};
					}

					default: {
						throw new Error( `Quadrant must be a number between 1 and 4 (inclusive). Instead got: ${dim.quadrant}` );
					}
				}
			} );

			const innerRadiuses = innerMostPoints.map( point => Math.abs( this.distanceBetweenPoints( this.epicenter, point ) ) );

			return Math.min( ...innerRadiuses );
		},

		getQuadrant( point ) {
			if ( point.x > this.epicenter.x && point.y < this.epicenter.y ) {
				return 1;
			}

			if ( point.x > this.epicenter.x && point.y > this.epicenter.y ) {
				return 2;
			}

			if ( point.x < this.epicenter.x && point.y > this.epicenter.y ) {
				return 3;
			}

			if ( point.x < this.epicenter.x && point.y < this.epicenter.y ) {
				return 4;
			}

			/**
			 *           |           *
			 *           |           *
			 *     4     |     1     *
			 *           |           *
			 *           |           *
			 * --------------------- *
			 *           |           *
			 *           |           *
			 *     3     |     2     *
			 *           |           *
			 *           |           *
			 */


			// it's not in any of the four quadrants, meaning
			// that either it's on the "x axis" or on the "y axis"
			// or both
			if ( point.x > this.epicenter.x || point.y > this.epicenter.y ) {
				// either it's on the y axis beyond the x axis
				// in which case either bottom quadrant is fine

				// or it's on the x axis beyond the y axis in which
				// case either of the right quadrants is fine

				// so we return the bottom right quadrant
				return 2;
			}

			if ( point.x < this.epicenter.x || point.y < this.epicenter.y ) {
				// either it's on the y axis before the x axis
				// in which case either top quadrant is fine

				// or it's on the x axis before the y axis in which
				// case either of the left quadrants is fine

				// so we return the top left quadrant
				return 4;
			}

			// it's directly on the epicenter.
			// return any quadrant
			return 1;
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
