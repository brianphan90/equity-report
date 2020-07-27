<template lang="pug">
.radial-bar-chart
	svg(
		:id='id'
		ref='svg'
	)
</template>

<script>
import * as d3 from 'd3';
import RadialBaseChart from '@/components/charts/RadialBaseChart';

export default {
	name : 'radial-bar-chart',

	extends : RadialBaseChart,

	props : {
		postChar : {
			type    : String,
			default : '%',
		}
	},

	data : () => ( {
		axisIndicators : null,
	} ),

	mounted() {
		this.init( this.$refs.svg );
	},

	methods : {
		draw() {
			const {
				data,
				legend,
				// title,
			} = this.data;

			// format radial data
			const formattedData = this.formatData( data, legend );

			console.log( formattedData );

			// draw outside labels
			this.drawLabels( formattedData );

			// draw backdrop and center
			this.drawBackdrop();

			// draw orbs
			this.drawOrbs( formattedData );

			// draw radial lines
			this.drawRadialLines( formattedData );
		},

		formatData( data, legend ) {
			const dataKeys = Object.keys( data ).filter( key => legend[key] );

			const twoRadians   = 2 * Math.PI;
			const sliceRadians = twoRadians / dataKeys.length;

			return dataKeys
				.map( ( key, i ) => ( {
					startAngle : ( i * sliceRadians ),
					endAngle   : ( i + 1 ) * sliceRadians,
					proportion : data[key] / 100,
					value      : data[key],
					...legend[key],
				} ) );
		},

		drawLabels( data ) {
			// add some items to data.
			// some calculations need to be
			// done here as the value of this.r
			// is variable
			const textData = data.map( ( d ) => {
				const labelAngle = ( d.startAngle + d.endAngle ) / 2;
				const { x, y }   = this.pointFromCenter( labelAngle, this.r );
				const quadrant   = Math.floor( labelAngle / ( Math.PI / 2 ) );

				return {
					...d,
					labelAngle,
					quadrant,
					x,
					y,
				};
			} );

			// add the main wrapper
			const labelsWrapper = this.canvas
				.append( 'g' )
				.attr( 'class', 'labels-wrapper' );

			// add a bunch of little groups
			const labelGroups = labelsWrapper.selectAll( '.label' )
				.data( textData )
				.enter()
				.append( 'g' );

			// add the label texts
			const labelTexts = labelGroups
				.append( 'text' )
				.attr( 'x', d => d.x )
				.attr( 'y', d => d.y )
				.attr( 'dominant-baseline', 'middle' )
				.attr( 'text-anchor', 'middle' )
				.style( 'fill', 'white' )
				.text( d => d.label );

			// listen for mode change
			this.changeWithMode( {
				nodes   : labelTexts,
				options : {
					day : {
						style : [
							['fill', '#fff'],
						],
					},
					night : {
						style : [
							['fill', '#fff']
						]
					}
				}
			} );

			// create the boxes
			const labels    = Array.from( labelTexts._groups[0] );
			const labelDims = labels.map( node => node.getBBox() );

			const labelBoxes = labelGroups
				.append( 'rect' )
				.attr( 'x', d => d.x )
				.attr( 'y', d => d.y )
				.attr( 'height', ( d, i ) => labelDims[i].height + 10 )
				.attr( 'width', ( d, i ) => labelDims[i].width + 10 )
				.attr( 'transform', ( d, i ) => `translate( -${( labelDims[i].width + 10 ) / 2}, -${( labelDims[i].height + 10 ) / 2})` )
				.lower();

			// watch for mode change
			this.changeWithMode( {
				nodes   : labelBoxes,
				options : {
					night : {
						style : [
							['fill', '#444'],
						],
					},
					day : {
						style : [
							['fill', '#000']
						]
					}
				}
			} );

			// add value labels
			const valueLabels = labelGroups
				.append( 'text' )
				.attr( 'y', d => d.y )
				.attr( 'x', d => d.x )
				.attr( 'dominant-baseline', 'text-after-edge' )
				.attr( 'text-anchor', 'middle' )
				.attr( 'transform', ( d, i ) => {
					const dims = labelDims[i];

					return `translate( 0, -${( dims.height / 2 ) + 10})`;
				} )
				.text( d => `${d.value}${this.postChar}` );

			this.changeWithMode( {
				nodes   : valueLabels,
				options : {
					night : {
						style : [
							['fill', '#fff']
						]
					},
					day : {
						style : [
							['fill', '#333']
						]
					}
				}
			} );

			// find the outer most radius of the
			// text nodes
			const outerMostRadius  = this.getOuterMostRadiusOfNodes( labelGroups );
			const radiusDifference = ( outerMostRadius - this.or );

			console.log( radiusDifference );

			// translate everything
			labelGroups
				.selectAll( '*' )
				.attr( 'x', ( d ) => {
					const oldPoint = {
						x : d.x,
						y : d.y
					};

					return this.pointFromPointAndVector( oldPoint, d.labelAngle, radiusDifference * -1 ).x;
				} )
				.attr( 'y', ( d ) => {
					const oldPoint = {
						x : d.x,
						y : d.y
					};

					return this.pointFromPointAndVector( oldPoint, d.labelAngle, radiusDifference * -1 ).y;
				} );

			// get the innermost radius of
			// the text nodes
			const innerMostRadius  = this.getInnerMostRadiusOfNodes( labelGroups );
			console.log( this.or - innerMostRadius );

			this.updateDims( {
				o : this.or - innerMostRadius,
			} );
		},

		drawBackdrop() {
			const circle = this.canvas
				.append( 'circle' )
				.attr( 'cx', this.epicenter.x )
				.attr( 'cy', this.epicenter.y )
				.attr( 'r', this.or );

			this.changeWithMode( {
				nodes   : circle,
				options : {
					day : {
						style : [
							['fill', '#fff']
						]
					},
					night : {
						style : [
							['fill', '#444']
						]
					}
				}
			} );

			const labelGroup = this.canvas
				.append( 'g' )
				.attr( 'class', 'center-label-group' );

			const text = labelGroup.append( 'text' )
				.attr( 'x', this.epicenter.x )
				.attr( 'y', this.epicenter.y + 15 )
				.attr( 'text-anchor', 'middle' )
				.attr( 'dominant-base-line', 'middle' );

			const { title } = this.data;
			const firstWord = title.split( ' ' )[0];
			const nextWords = title.split( ' ' ).slice( 1 );

			const wordGroups = [firstWord, nextWords.join( ' ' )];

			wordGroups.forEach( ( d, i ) => {

				text
					.append( 'tspan' )
					.attr( 'dy', `${( i * 30 ) - 15}px` )
					.attr( 'x', this.epicenter.x )
					.style( 'font-size', i ? '14px' : '20px' )
					.style( 'font-weight', i ? '400' : '600' )
					.text( d );
			} );

			this.changeWithMode( {
				nodes   : text.selectAll( 'tspan' ),
				options : {
					night : {
						style : [
							['fill', '#fff']
						]
					},
					day : {
						style : [
							['fill', '#fff']
						]
					}
				}
			} );

			const outerRadiusOfText = this.getOuterMostRadiusOfNodes( text );

			const centerCircle = labelGroup.append( 'circle' )
				.attr( 'cx', this.epicenter.x )
				.attr( 'cy', this.epicenter.y )
				.attr( 'r', outerRadiusOfText + 5 )
				.lower();

			this.changeWithMode( {
				nodes   : centerCircle,
				options : {
					night : {
						style : [
							['fill', '#333']
						]
					},
					day : {
						style : [
							['fill', '#000']
						]
					}
				}
			} );

			this.updateDims( {
				ir : outerRadiusOfText + 15
			} );
		},

		drawOrbs( data ) {
			const orbWrapper = this.canvas
				.append( 'g' )
				.attr( 'class', 'orb-wrapper' )
				.attr( 'transform', `translate( ${this.svgWidth / 2}, ${this.svgHeight / 2} )` );

			orbWrapper
				.selectAll( '.orb-arc' )
				.data( data )
				.enter()
				.append( 'path' )
				.attr( 'fill', d => d.color )
				.attr( 'd', d => d3
					.arc()
					.innerRadius( this.ir )
					.outerRadius( d.proportion ? this.ir + 5 : this.ir )
					.startAngle( d.startAngle )
					.endAngle( d.endAngle )() )
				.transition()
				.duration( 100 )
				.delay( ( d, i ) => i * 75 )
				.attr( 'd', d => d3
					.arc()
					.innerRadius( this.ir )
					.outerRadius( ( ( this.or - this.ir ) * d.proportion ) + this.ir )
					.startAngle( d.startAngle )
					.endAngle( d.endAngle )() );

		},

		drawRadialLines( data ) {
			const radialIndicators = this.canvas
				.append( 'g' )
				.attr( 'class', 'radial-indicators' );

			const circles = radialIndicators
				.selectAll( 'circle' )
				.data( new Array( 11 ) )
				.enter()
				.append( 'circle' )
				.attr( 'cx', this.epicenter.x )
				.attr( 'cy', this.epicenter.y )
				.attr( 'r', ( d, i ) => this.ir + ( ( this.or - this.ir ) * ( i / 10 ) ) )
				.style( 'fill', 'transparent' )
				.style( 'opacity', '0.5' )
				.style( 'stroke-width', '1px' );

			this.changeWithMode( {
				nodes   : circles,
				options : {
					day : {
						style : [
							['stroke', '#fff']
						]
					},
					night : {
						style : [
							['stroke', '#444']
						]
					}
				}
			} );

			const lineData = data.map( ( d ) => {
				const { startAngle } = d;
				const { epicenter }  = this;
				const startPoint     = this.pointFromPointAndVector( epicenter, startAngle, this.ir );
				const endPoint       = this.pointFromPointAndVector( startPoint, startAngle, ( this.r - this.ir ) - ( this.o / 2 ) );

				return {
					...d,
					startPoint,
					endPoint,
				};
			} );

			const lineGroups = radialIndicators
				.selectAll( 'g' )
				.data( lineData )
				.enter();

			lineGroups.append( 'path' )
				.attr( 'd', d => this.pathFromPoints( [d.startPoint, d.endPoint] ) )
				.style( 'stroke', '#000' )
				.style( 'stroke-width', '2px' );

			lineGroups.append( 'circle' )
				.attr( 'cx', d => d.endPoint.x )
				.attr( 'cy', d => d.endPoint.y )
				.attr( 'r', 4 );
		}
	}

};
</script>

<style lang="scss">
.radial-bar-chart {

	svg {
		height: 100%;
		width: 100%;
	}
}
</style>
