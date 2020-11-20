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

	props : {
		options : {
			type    : Object,
			default : () => ( {} )
		}
	},

	data : () => ( {
		axisIndicators : null,
		barGroups      : null
	} ),

	computed : {
		numOfBars() {
			return Object.keys( this.data ).length;
		},

		maxBarWidth() {
			const { aw, numOfBars, defaultPadding } = this;

			return aw / numOfBars;
		},

		barWidth() {
			const { maxBarWidth } = this;
			return Math.min( maxBarWidth, 25 );
		},

		barPadding() {
			const { barWidth, numOfBars, aw } = this;
			return ( aw - ( barWidth * numOfBars ) ) / numOfBars;
		},

		range() {
			const { data } = this;
			const { range } = this.options;
			const defaultRange = {
				min : 0,
				max : 100
			};

			if ( range === 'calculated' ) {
				const values = Object.keys( data ).map( key => data[key] );
				const dataRange = this.getDataRange( values, false );
				return {
					min : dataRange.start,
					max : dataRange.end
				};
			}

			if ( typeof range === 'object' ) {
				return range;
			}

			return defaultRange;
		}
	},

	mounted() {
		this.init( this.$refs.svg, {
			t : 1,
			b : 1,
		} );
	},

	watch : {
		range() {
			this.draw();
		}
	},

	methods : {
		draw() {
			// set slight padding on our svg
			this.updateDims( {
				b : 1,
				t : 1,
			} );

			const { range, options } = this;
			const { hasXAxis } = options;

			// Compute the position and size of the bars
			const barData   = this.computeBarData();
			console.log( 'barData', barData );
			const barGroups = this.createBarGroup( barData );
			console.log( 'barGroups', barGroups );

			let xAxisLabels = null;

			if ( hasXAxis ) {
				xAxisLabels = this.drawXAxisLabels( barGroups );
			}

			// draw labels
			const lineIndicators = this.drawAxisIndicators( {
				range,
				axis     : 'y',
				postChar : this.options.postChar === false ? '' : '%',
				lines    : {
					spaceBetweenLabelsAndLines : 5,
					numberOfIndicators         : this.options.numberOfIndicators || 5,
				},
				dayColor   : colors.grey,
				nightColor : colors.white,
			} );

			if ( hasXAxis ) {
				// redraw axisIndicators
				xAxisLabels.attr( 'x', ( d, i ) => this.getTextX( i ) );
			}

			// draw bars
			this.drawBars( barGroups );

			// Draw a second set of lines over the bars
			this.drawAxisIndicators( {
				range,
				axis   : 'y',
				labels : false,
				lines  : {
					spaceBetweenLabelsAndLines : 5,
					numberOfIndicators         : this.options.numberOfIndicators || 5
				},
				dayColor   : colors.opaqueWhite,
				nightColor : colors.opaqueWhite,
			} );

		},

		computeBarData() {
			const { orderedLegend } = this;

			return orderedLegend.map( ( legend, i ) => {
				const { key, label, color } = legend;
				const value = this.data[key];

				return {
					label,
					color,
					value
				};

			} );
		},

		createBarGroup( barData ) {
			return this.canvas.selectAll( `bars-${this.id}` )
				.data( barData )
				.enter()
				.append( 'g' );
		},

		drawBars( barGroups ) {
			barGroups
				.append( 'rect' )
				.attr( 'x', ( d, i ) => this.getX( i ) )
				.attr( 'y', d => this.getY( this.getHeight( d.value ) ) )
				.attr( 'fill', d => d.color )
				.attr( 'height', d => this.getHeight( d.value ) )
				.attr( 'width', d => this.barWidth );

			return barGroups;
		},

		drawXAxisLabels( barGroups ) {
			const xAxisLabels = barGroups
				.append( 'text' )
				.attr( 'class', 'x-axis-labels' )
				.attr( 'x', ( d, i ) => this.getTextX( i ) )
				.attr( 'y', this.t + this.ah )
				.attr( 'text-anchor', 'middle' )
				.attr( 'dominant-baseline', 'start' )
				.style( 'font-size', '12px' )
				.text( d => d.label );

			this.changeWithMode( {
				nodes   : xAxisLabels,
				options : {
					day : {
						style : [
							['fill', colors.grey],
						],
					},
					night : {
						style : [
							['fill', colors.white],
						],
					},
				},
			} );

			const barLabelNodes = barGroups.selectAll( '.x-axis-labels' );
			const barLabelWidths = Array.from( barLabelNodes._groups[0] ).map( a => a.getBBox().height );
			const biggestBarLabel = Math.max( ...barLabelWidths );
			const spaceBetweenBarAndXAxis = 2;

			this.updateDims( {
				b : biggestBarLabel + spaceBetweenBarAndXAxis
			} );

			return xAxisLabels;
		},

		getX( i ) {
			const { l, barWidth, barPadding } = this;

			return l + ( barWidth * i ) + ( barPadding * i ) + ( barPadding / 2 );
		},

		getY( height ) {
			const { ah, t } = this;

			return ah + t - height;
		},

		getTextX( i ) {
			const { l, barWidth, barPadding } = this;

			return ( l + ( barWidth * i ) + ( barPadding * i ) ) + ( barWidth / 2 ) + ( barPadding / 2 );
		},

		getHeight( value ) {
			const { max } = this.range;

			console.log( 'this range ', this.range );

			return ( value / max ) * this.ah;
		},
	}

};
</script>

<style lang="scss">

</style>
