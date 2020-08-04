<template lang="pug">
	.multi-bar-chart
		.header
			h1.title {{ title }}
			.legend
				chart-legend(:legend='legend'  :columns='1')
		.chart
			svg(ref='svg')

</template>

<script>
import colors from '@/assets/js/colors';
import ChartLegend from '@/components/ChartLegend';
import BaseChart from '@/components/charts/BaseChart';
import * as d3 from 'd3';


export default {
	name : 'multi-bar-chart',

	extends : BaseChart,

	props : {
		title : {
			type : String
		},

		options : {
			type    : Object,
			default : () => ( {
				maxTextLength : 150,
				barSpacing    : 2,
				groupSpacing  : 7
			} )
		}
	},

	data : () => ( {
		xAxisLabels : null,
		barGroups   : null,
		bars        : null
	} ),

	computed : {
		groupSpacing() {
			return this.options.groupSpacing || 7;
		},

		barSpacing() {
			return this.options.barSpacing || 2;
		},

		numberOfGaps() {
			const { data } = this;

			if ( !data ) {
				return 1;
			}

			return data.length + 1;
		},

		numberOfBarsInGroups() {
			const { legend } = this;

			return Object.keys( legend ).length;
		},

		totalBars() {
			const { numberOfBarsInGroups, data } = this;

			return numberOfBarsInGroups * data.length;
		},

		totalSpaceBetweenGroups() {
			return this.numberOfGaps * this.groupSpacing;
		},

		spaceBetweenBars() {
			return this.numberOfBarsInGroups * this.barSpacing;
		},

		totalSpaceBetweenBars() {
			return this.spaceBetweenBars * this.data.length;
		},

		totalSpace() {
			const { totalSpaceBetweenGroups, totalSpaceBetweenBars } = this;

			return totalSpaceBetweenGroups + totalSpaceBetweenBars;
		},

		barWidth() {
			const { aw, totalSpace, totalBars } = this;

			const barWidth = ( aw - totalSpace ) / totalBars;
			return Math.min( barWidth, 30 );
		},

		groupWidth() {
			const { barWidth, numberOfBarsInGroups, spaceBetweenBars } = this;

			return ( barWidth * numberOfBarsInGroups ) + spaceBetweenBars;
		},

		range() {
			const { data, legend } = this;
			const barKeys = Object.keys( legend );

			const values = data.reduce( ( arr, d ) => {

				barKeys.forEach( ( key ) => {
					const value = d.value[key];

					if ( !value ) {
						return;
					}

					arr.push( value );
				} );

				return arr;
			}, [] );

			if ( !values.length ) {
				return {
					min : 0,
					max : 100
				};
			}

			const range = this.getDataRange( values, false );

			return {
				min : range.start,
				max : range.end
			};
		}
	},

	mounted() {
		this.init( this.$refs.svg );
	},

	methods : {
		draw() {
			// set beginning dims
			this.updateDims( {
			} );

			const { range } = this;

			const barGroupsData = this.computeBarGroupsData();
			this.barGroups = this.createBarGroup( barGroupsData );

			this.xAxisLabels = this.drawXAxisLabels( this.barGroups );

			// draw labels
			const lineIndicators = this.drawAxisIndicators( {
				range,
				axis     : 'y',
				postChar : '',
				lines    : {
					spaceBetweenLabelsAndLines : 5,
					numberOfIndicators         : this.options.numberOfIndicators || 6,
				},
				dayColor   : colors.grey,
				nightColor : colors.white,
			} );

			this.xAxisLabels.attr( 'x', ( d, i ) => this.getTextX( i ) );

			this.drawBars( this.barGroups );

		},

		computeBarGroupsData() {
			const { legend, groupWidth, groupSpacing } = this;
			const barKeys = Object.keys( this.legend );

			return this.data.map( ( d, i ) => {
				const { label, value } = d;

				const values = barKeys.reduce( ( arr, key ) => {
					const { color } = legend[key];
					const v = d.value[key];

					if ( !v ) {
						return arr;
					}

					arr.push( {
						color,
						value : v
					} );

					return arr;
				}, [] );

				return {
					label,
					values
				};
			} );
		},

		createBarGroup( barData ) {
			return this.canvas.selectAll( `bar-groups-${this.id}` )
				.data( barData )
				.enter()
				.append( 'g' );
		},

		computeBarData( data, i ) {
			const { groupWidth, groupSpacing } = this;

			return data.map( ( d ) => {
				const groupOffset = ( groupWidth + groupSpacing ) * i;

				return {
					...d,
					groupOffset
				};
			} );
		},

		drawBars( barGroups ) {

			const bars = barGroups.selectAll( `bar-${this.id}` )
				.data( ( d, i ) => this.computeBarData( d.values, i ) )
				.enter()
				.append( 'g' );

			bars
				.append( 'rect' )
				.attr( 'x', ( d, i ) => this.getX( i ) + d.groupOffset )
				.attr( 'y', ( d ) => {
					const y = this.getY( this.getHeight( d.value ) );
					return y;
				} )
				.attr( 'fill', d => d.color )
				.attr( 'height', d => this.getHeight( d.value ) )
				.attr( 'width', d => this.barWidth );
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
			const { l, barWidth, barSpacing } = this;

			return l + ( barWidth * i ) + ( barSpacing * i );
		},

		getY( height ) {
			const { ah, t } = this;

			return ah + t - height;
		},

		getTextX( i ) {
			const {
				l,
				groupWidth,
				groupSpacing
			} = this;

			return ( l + ( groupSpacing * i ) + ( groupWidth * i ) + ( groupWidth / 2 ) );
		},

		getHeight( value ) {
			const { max } = this.range;

			return ( value / max ) * this.ah;
		},

	},

	components : {
		ChartLegend
	}

};
</script>

<style lang="scss">
	.multi-bar-chart {
		background-color: white;
		padding: 20px;
		display: flex;
		flex-direction: column;

		.header {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;

			.title {
				font-family: 'Roboto';
				font-style: normal;
				font-weight: bold;
				font-size: 14px;
				line-height: 16px;
			}

		}

		.chart {
			flex: 1 1 0;

			svg {
				width: 100%;
				height: 100%;
			}
		}
	}

</style>
