<template lang="pug">
.simple-stacked-bar-chart
	svg(
		:id='id'
		ref='svg'
		height='150'
		width='150'
	)
</template>

<script>
import * as d3 from 'd3';
import BaseChart from '@/components/charts/BaseChart';
import colors from '@/assets/js/colors';

export default {
	name : 'simple-stacked-bar-chart',

	extends : BaseChart,

	data : () => ( {
		axisIndicators : null,
	} ),

	mounted() {
		this.init( this.$refs.svg, {
			t : 1,
			b : 1,
		} );
	},

	methods : {
		draw() {
			// set slight padding on our svg
			this.updateDims( {
				b : 1,
				t : 1,
			} );

			// draw labels
			this.drawAxisIndicators( {
				range : {
					min : 0,
					max : 100,
				},
				axis     : 'y',
				postChar : '%',
				lines    : {
					spaceBetweenLabelsAndLines : 5,
					numberOfIndicators         : 5,
				},
				dayColor   : colors.grey,
				nightColor : colors.white,
			} );

			// Compute the position and size of the bars
			const barData   = this.computeBarData();
			const barGroups = this.drawBars( barData );

			// Draw a second set of lines over the bars
			this.drawAxisIndicators( {
				range : {
					min : 0,
					max : 100,
				},
				axis   : 'y',
				labels : false,
				lines  : {
					spaceBetweenLabelsAndLines : 5,
					numberOfIndicators         : 5,
				},
				color : colors.opaqueWhite,
			} );

			// draw the bar labels
			this.drawBarLabels( barGroups );

			// check if any of the bar groups
			// are overlapping
			this.fixBarLabelOverlaps( barGroups );

			// correct overlaps
			this.correctTextSVGOverlaps();

			// animate the bars and texts
			this.animateChart();
		},

		computeBarData() {
			const barKeys = Object.keys( this.data );
			const sum     = barKeys.reduce( ( total, key ) => total + this.data[key], 0 );

			let runningSum = 0;
			return barKeys.map( ( key ) => {
				// get the value and the height
				const value  = this.data[key];
				const height = ( value / sum ) * this.ah;

				// determine the y value for the bar
				const y = this.t + ( ( runningSum / sum ) * this.ah );

				// add to running sum so we can
				// do y value calculations
				runningSum += value;

				return {
					width : this.aw - 60, // 30px on each side
					color : this.legend[key].color,
					text  : `${value}%`,
					x     : this.l + 30, // 30px to the left
					y,
					height,
				};
			} );
		},

		drawBars( barData ) {
			// Draw the bars
			const barGroups = this.canvas.selectAll( `bars-${this.id}` )
				.data( barData )
				.enter()
				.append( 'g' );

			barGroups
				.append( 'rect' )
				.attr( 'x', d => d.x )
				.attr( 'y', d => d.y )
				.attr( 'fill', d => d.color )
				.attr( 'height', d => d.height )
				.attr( 'width', d => d.width )
				.style( 'opacity', 0 )
				.attr( 'class', `bar-${this.id} translate-${this.id}` );

			return barGroups;
		},

		drawBarLabels( barGroups ) {
			barGroups
				.append( 'text' )
				.attr( 'class', `text-node-${this.id} translate-${this.id}` )
				.attr( 'x', d => ( d.x + d.width ) - 3 )
				.attr( 'y', d => d.y + 3 )
				.attr( 'fill', '#ffffff' )
				.attr( 'text-anchor', 'end' )
				.attr( 'dominant-baseline', 'text-before-edge' )
				.style( 'opacity', 0 )
				.text( d => d.text );
		},

		fixBarLabelOverlaps( barGroups ) {
			const barGroupElements  = Array.from( barGroups._groups[0] );
			const textAndBarHeights = barGroupElements
				.map( group => ( {
					rectangleHeight : group.childNodes[0].getBBox().height,
					textHeight      : group.childNodes[1].getBBox().height,
					textNode        : group.childNodes[1],
					group
				} ) );

			const groupsWithTextToMove = textAndBarHeights
				.filter( ( { rectangleHeight, textHeight } ) => rectangleHeight < ( textHeight + 6 ) )
				.map( ( { group } ) => group );


			const correctYPos = ( y, yPrev, textHeight, index, length, ah, d ) => {
				const yDiff = y - yPrev;

				if ( index === 0 && y < textHeight ) {
					return y;
				}

				if ( index === length - 1 && y + textHeight > ah ) {
					return ah - textHeight;
				}

				const multiplier = length - 1 - index;
				const spaceRemaining = ah - ( y + textHeight );
				if ( spaceRemaining < textHeight ) {
					return y - ( textHeight * multiplier );
				}

				if ( yDiff < textHeight ) {
					return yPrev + textHeight;
				}

				return y;
			};

			// move all the necessary text
			let yPrev = 0;
			const { length } = groupsWithTextToMove;
			groupsWithTextToMove.forEach( ( group, index ) => {
				const d = group.__data__;

				const textHeight = group.childNodes[1].getBBox().height;
				const { ah } = this;
				const newY = correctYPos( d.y, yPrev, textHeight, index, length, this.ah, d );

				d3.select( group )
					.select( 'text' )
					.attr( 'x', d.x + d.width + 6 )
					.attr( 'y', newY )
					.attr( 'text-anchor', 'start' )
					.attr( 'fill', d.color );

				yPrev = newY;
			} );
		},

		correctTextSVGOverlaps() {
			// finally we have to check if any of the text is now
			// overflowing the SVG

			const texts = this.canvas
				.selectAll( 'text' );

			const textNodes          = Array.from( texts._groups[0] );
			const canvasWidth        = this.canvas.attr( 'width' );
			const overlappingAmounts = textNodes.map( node => node.getBBox() )
				.map( dims => ( dims.x + dims.width ) )
				.filter( rightMostEdge => rightMostEdge > canvasWidth );

			if ( !overlappingAmounts.length ) {
				return;
			}

			const maxOverlap = Math.max( ...overlappingAmounts );
			const translateX = ( maxOverlap - canvasWidth ) + 5;

			this.canvas
				.selectAll( `.translate-${this.id}` )
				.style( 'transform', `translateX(-${translateX}px)` );
		},

		animateChart() {
			this.canvas
				.selectAll( `.bar-${this.id}` )
				.attr( 'width', 0 )
				.transition()
				.style( 'opacity', 1 )
				.duration( 200 )
				.delay( ( d, i ) => ( i * 50 ) )
				.attr( 'width', d => d.width );

			this.canvas
				.selectAll( 'text' )
				.transition()
				.duration( 200 )
				.delay( ( d, i ) => 200 + ( i * 50 ) )
				.style( 'opacity', 1 );
		}
	}
};
</script>

<style lang="scss">
</style>
