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
					numberOfIndicators         : 5
				},
				color : colors.grey,
			} );

			// Compute the position and size of the bars
			const barKeys = Object.keys( this.data );
			const sum     = barKeys.reduce( ( total, key ) => total + this.data[key], 0 );

			let runningSum = 0;
			const barData = barKeys.map( ( key ) => {
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
				.attr( 'width', d => d.width );

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
			barGroups
				.append( 'text' )
				.attr( 'class', `text-node-${this.id}` )
				.attr( 'x', d => ( d.x + d.width ) - 3 )
				.attr( 'y', d => d.y + 3 )
				.attr( 'fill', '#ffffff' )
				.attr( 'text-anchor', 'end' )
				.attr( 'dominant-baseline', 'text-before-edge' )
				.text( d => d.text );

			// check if any of the bar groups
			// are overlapping
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

			groupsWithTextToMove.forEach( ( group ) => {
				const d = group.__data__;

				d3.select( group )
					.select( 'text' )
					.attr( 'x', d.x + d.width + 6 )
					.attr( 'text-anchor', 'start' )
					.attr( 'fill', d.color );
			} );
			// d3.select( textNodesToMove )
			// 	.attr( 'x', d = );
			// Add hover effects

		}
	}
};
</script>

<style lang="scss">

</style>
