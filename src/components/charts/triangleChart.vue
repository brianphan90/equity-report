<template lang="pug">
    .comparisonChart
        svg(ref='svg')

</template>
<script>
import colors from '@/assets/js/colors';
import ChartLegend from '@/components/ChartLegend';
import BaseChart from '@/components/charts/BaseChart';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

export default {
	name    : 'triangleChart',
	extends : BaseChart,
	props   : {
		dataIn : {
			type    : Array,
			default : () => ( [
				{
					label    : '2017-2018',
					negative : 64.51,
					positive : 35.48
				},
				{
					label    : '2018-2019',
					negative : 59.62,
					positive : 40.38
				}
			] )
		}
	},
	computed : {
		getPositiveVals() {
			return this.data.map( entry => entry.positive );
		},
		getNegativeVals() {
			return this.data.map( entry => entry.negative );
		}

	},
	mounted() {
		this.init( this.$refs.svg );
	},
	methods : {
		draw() {
			const xAxisData = {
				axis                       : 'x-bottom',
				values                     : this.dataIn,
				spaceBetweenLabelsAndChart : 0,

			};
		},
		drawXAxisIndicators( options ) {
			const {
				axis,
				values,
				spaceBetweenLabelsAndChart,
				labelStyle,
			} = options;
			const getX = ( i ) => {
				const { aw, l } = this;

				return l + ( ( aw / ( values.length + 1 ) ) * ( i + 1 ) );
			};
			const xAxisData = values.map( ( datum, i ) => {
				const y = () => ( ( axis === 'x-top' ) ? this.t : ( this.t + this.ah ) / 2 );
				const x = () => getX( i );
				return {
					...datum,
					x,
					y,
					textAnchor       : 'middle',
					dominantBaseline : ( axis === 'x-top' ) ? 'text-before-edge' : 'text-after-edge',
				};

			} );
			const xAxisLabels = this.canvas
				.selectAll( 'x-axis-labels axis-label' )
				.data( xAxisData )
				.enter()
				.append( 'text' )
				.attr( 'text-anchor', d => d.textAnchor )
				.attr( 'x', d => d.x() )
				.attr( 'y', d => d.y() )
				.attr( 'dominant-baseline', d => d.dominantBaseline )
				.style( 'fill', d => d.color )
				.text( d => d.label );


			if ( labelStyle ) {
				this.applyMethods( xAxisLabels, 'style', labelStyle );
			}
			const verticalPadding = 5;
			const xAxisLabelDims    = Array.from( xAxisLabels._groups[0] ).map( a => a.getBBox() );
			const xAxisLabelHeights = xAxisLabelDims.map( a => a.height );
			const xAxisLabelWidths  = xAxisLabelDims.map( a => a.width );
			const biggestXAxisLabelHeight = Math.max( ...xAxisLabelHeights );
			const biggestXAxisLabelWidth = Math.max( ...xAxisLabelWidths );
			const rectHeight = biggestXAxisLabelHeight + ( 7 * verticalPadding );
			const rectWidth = biggestXAxisLabelWidth + ( 15 * verticalPadding );
			console.log( xAxisLabelDims );
			const dims = ( () => {
				if ( axis === 'y-top' ) {
					return {
						t : biggestXAxisLabelHeight + spaceBetweenLabelsAndChart,
					};
				}

				return {
					b : biggestXAxisLabelHeight + spaceBetweenLabelsAndChart + rectHeight,
				};
			} )();

			this.updateDims( dims );
			this.realignAxisLabels();

			const barLabelGroup = this.canvas.selectAll( 'boxLabels' )
				.data( xAxisLabelDims )
				.enter()
				.append( 'rect' )
				.attr( 'x', ( d, i ) => getX( i ) - ( rectWidth / 2 ) )
				.attr( 'y', d => ( this.t + this.ah ) / 2 ) // middle
				.attr( 'fill', '#E4E4E4' )
				.attr( 'opacity', 0.8 )
				.attr( 'height', rectHeight )
				.attr( 'stroke', 'black' )
				.attr( 'stroke-width', 2 )
				.attr( 'width', rectWidth );

			// console.log( barLabelGroup );
			// ? center texts as necessary
			// const totalTextSpace = xAxisLabelWidths.reduce( ( sum, w ) => sum + w, 0 );
			// const leftOverSpace  = this.aw - totalTextSpace;
			// const spaceAround    = ( leftOverSpace / ( values.length + 1 ) );
			const barLabelDims = barLabelGroup._groups[0].map( entry => entry.getBBox() );
			console.log( barLabelDims );
			return barLabelDims;
			// return xAxisData;


		}
	}
};
</script>
