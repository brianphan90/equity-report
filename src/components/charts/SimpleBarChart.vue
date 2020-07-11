<template lang="pug">
	.simple-bar-chart(ref='chart')
		svg(
			:id='id'
			ref='svg'
			height='500px'
			width='500px'
		)
</template>

<script>
import * as d3 from 'd3';
import BaseChart from '@/components/charts/BaseChart';

export default {
	name : 'simple-bar-chart',

	extends : BaseChart,

	props : {
		title : {
			type : String
		}
	},

	data : () => ( {
		axisIndicators : null,
		svgHeight      : 0,
		svgWidth       : 0
	} ),

	mounted() {
		this.init( this.$refs.svg, {
			t : 1,
			b : 1,
		} );

		const { chart } = this.$refs;
	},

	methods : {
		draw() {
			// set slight padding on our svg
			this.updateDims( {
				b : 1,
				t : 1,
			} );

			// draw chart label
			if ( this.title ) {
				const chartLabel = this.canvas.append( 'text' )
					.attr( 'x', 0 )
					.attr( 'y', this.t )
					.attr( 'text-anchor', 'start' )
					.attr( 'dominant-baseline', 'text-before-edge' )
					.style( 'fill', 'black' )
					.style( 'font-size', '16px' )
					.style( 'text-decoration', 'underline' )
					.style( 'font-weight', '300' )
					.text( this.title );
			}

			// draw x axis labels
			const barSpacing = 4;
			const barWidth   = ( this.aw - ( this.data.length * barSpacing ) ) / this.data.length;
			const getX       = ( i, centered = false ) => {

				const halfBarSpacing = ( barSpacing / 2 );
				const fullBarWidth   = ( barWidth + barSpacing );
				let barOffset        = this.l + ( fullBarWidth * i ) + halfBarSpacing;

				if ( centered ) {
					barOffset += ( barWidth / 2 );
				}

				return barOffset;

			};

			const barWrappers = this.canvas
				.selectAll( `bars-${this.id}` )
				.data( this.data )
				.enter()
				.append( 'g' )
				.attr( 'class', `bars-${this.id}` );

			const barLabels = barWrappers.append( 'text' )
				.attr( 'class', `bar-label-${this.id}` )
				.attr( 'x', ( d, i ) => getX( i ) )
				.attr( 'y', this.t + this.ah )
				.text( ( d, i ) => d.label );

			const barLabelWidths          = Array.from( barLabels._groups[0] ).map( a => a.getBBox().height );
			const biggestBarLabel        	= Math.max( ...barLabelWidths );
			const spaceBetweenBarAndXAxis = 2;

			this.updateDims( {
				b : biggestBarLabel + spaceBetweenBarAndXAxis
			} );

			// draw bars
			const bars = barWrappers.append( 'rect' )
				.attr( 'class', `bar-${this.id}` )
				.attr( 'x', ( d, i ) => getX( i ) )
				.attr( 'y', this.t + this.ah )
				.attr( 'height', 0 ) // set as zero at first to animate it later
				.attr( 'width', barWidth )
				.style( 'fill', d => d.color );

			const dataRange = this.getRange( this.data );
			const rangeDifference = dataRange.end - dataRange.start;

			bars.transition( 200 )
				.delay( ( d, i ) => i * 100 )
				.attr( 'height', ( d, i ) => {

					const valueDifference = d.value - dataRange.start;
					const scaledValue     = valueDifference / rangeDifference;

					return scaledValue * this.ah;

				} )
				.attr( 'y', ( d, i ) => {

					const valueDifference = d.value - dataRange.start;
					const scaledValue     = valueDifference / rangeDifference;
					const yPos = this.t + this.ah - ( scaledValue * this.ah );

					return yPos;
				} ); // aligns to bottom basically

			const barValueLabel = barWrappers.append( 'text' )
				.attr( 'class', `bar-value-label-${this.id}` )
				.attr( 'x', ( d, i ) => getX( i ) )
				.attr( 'y', ( d, i ) => {

					const valueDifference = d.value - dataRange.start;
					const scaledValue     = valueDifference / rangeDifference;
					const spaceBetweenBarAndLabel = 5;
					const yPos = this.t + this.ah - ( scaledValue * this.ah ) - spaceBetweenBarAndLabel;

					return yPos;
				} )
				.text( d => d.value )
				.style( 'fill', d => d.color );

			barValueLabel.append( 'rect' )
				.attr( 'width', d => d.bbox.width )
				.attr( 'height', d => d.bbox.height )
				.style( 'fill', 'yellow' );


		},

		getRange( data, scaled = true ) {
			const values = data.map( a => a.value );

			const avg = values.reduce( ( a, b ) => a + b, 0 ) / values.length;

			const biggest    = Math.max( ...values );
			const smallest   = Math.min( ...values );
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
			const relevantIncrement = 10 ** scale;

			// we'll start by trying to do a
			// scale from the closest instance of
			// our relevant increment to a point
			// four more relevantIncrements away
			const start = !scaled ? 0 : ( Math.floor( smallest / relevantIncrement ) * relevantIncrement );
			const range = ( Math.ceil( ( difference + smallest - start ) / relevantIncrement ) ) * relevantIncrement;
			const end   = start + range;

			return {
				start,
				end,
			};

		}
	}

};
</script>

<style lang="scss">

</style>
