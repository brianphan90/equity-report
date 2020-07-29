<template lang="pug">
.simple-bar-chart
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
	name : 'simple-bar-chart',

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
				dayColor   : colors.opaqueWhite,
				nightColor : colors.opaqueWhite,
			} );

		},

		computeBarData() {
			const { l } = this;
			const barKeys = Object.keys( this.data );

			const barPadding                 = 5;
			const numberOfGaps               = barKeys.length + 1;
			const totalSpaceTakenUpByPadding = barPadding * numberOfGaps;
			const maxBarWidth                = ( this.aw - totalSpaceTakenUpByPadding ) / barKeys.length;
			const barWidth                   = Math.min( maxBarWidth, 30 );

			return barKeys.map( ( key, i ) => {
				const value = this.data[key];
				const height = ( value / 100 ) * this.ah;

				return {
					width : barWidth,
					color : this.legend[key].color,
					x     : l + ( barWidth * i ) + ( barPadding * i ),
					y     : this.ah + this.t - height,
					height
				};

			} );
		},

		drawBars( barData ) {
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

			return barGroups;
		},

	}

};
</script>

<style lang="scss">

</style>
