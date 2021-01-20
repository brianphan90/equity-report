<template lang='pug'>
.stacked-comparison-chart
	svg(ref='svg')
</template>

<script>
import colors from '@/assets/js/colors';
import ChartLegend from '@/components/ChartLegend';
import BaseChart from '@/components/charts/BaseChart';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

export default {
	name : 'StackedComparisonChart',

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
		},
	},

	data : () => ( {
		xAxisLabels : null,
		barGroups   : null,
		bars        : null,

	} ),

	computed : {
		groupSpacing() {
			const sumOfGroupWidths = ( this.groupWidth * this.data.length );

			return ( this.aw - sumOfGroupWidths ) / ( this.data.length );
			// return this.options.groupSpacing || ;
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
			return 8;
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
		},

		mode() {
			return this.$store.state.user.mode;
		},
	},

	mounted() {
		this.init( this.$refs.svg );
	},

	watch : {
		mode() {
			this.draw();
		}
	},

	methods : {
		draw() {
			// set beginning dims
			this.updateDims( {
				t : 2,
				b : 2
			} );

			const { range } = this;

			const barGroupsData = this.computeBarGroupsData();
			this.barGroups = this.createBarGroup( barGroupsData );

			this.xAxisLabels = this.drawXAxisLabels( this.barGroups );

			// draw labels
			this.drawAxisIndicators( {
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
			const { orderedLegend } = this;

			return this.data.map( ( d ) => {
				const { label, value } = d;

				const values = orderedLegend.reduce( ( arr, legend ) => {
					const { key, color } = legend;
					const v = value[key];

					arr.push( {
						color,
						legend,
						value : v,
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

			const bars = barGroups.selectAll( `bar-groups-${this.id}` )
				.data( ( d, i ) => this.computeBarData( d.values, i ) )
				.enter()
				.append( 'g' )
				.attr( 'class', `bar-wrapper-${this.id}` );

			bars
				.append( 'rect' )
				.attr( 'x', ( d, i ) => this.getX( i ) + d.groupOffset )
				.attr( 'y', ( d ) => {
					const y = this.getY( this.getHeight( d.value ) );
					return y;
				} )
				.attr( 'fill', ( d ) => {
					if ( d.legend.style === 'striped' ) {
						return 'transparent';
					}

					return d.color;
				} )
				.attr( 'stroke', ( d ) => {
					if ( d.legend.style === 'striped' ) {
						return d.color;
					}

					return 'none';
				} )
				.attr( 'stroke-width', ( d ) => {
					if ( d.legend.style === 'striped' ) {
						return '2';
					}

					return '0';
				} )
				.attr( 'height', d => this.getHeight( d.value ) )
				.attr( 'width', () => this.barWidth );

			// use this to make your lines render properly
			const roundToNearestMultipleOfEight = num => Math.ceil( Math.ceil( num ) / 8 ) * 8;

			bars
				.append( 'path' )
				.attr( 'd', ( d, i ) => {
					const x = this.getX( i ) + d.groupOffset + ( this.barWidth / 2 );

					const point1 = {
						x,
						y : Math.round( this.h - this.b ),
					};

					const point2 = {
						x,
						y : Math.min( point1.y, roundToNearestMultipleOfEight( point1.y - this.getHeight( d.value ) ) ),
					};

					return this.pathFromPoints( [point1, point2] );
				} )
				.style( 'stroke', d => d.color )
				.style( 'stroke-dasharray', ( d ) => {
					if ( d.legend.style === 'striped' ) {
						return '2, 6';
					}

					return '';
				} )
				.style( 'stroke-width', ( d ) => {
					if ( d.legend.style === 'striped' ) {
						return this.barWidth;
					}

					return 0;
				} );

			const tip = d3Tip()
				.offset( [-3, 0] )
				.attr( 'class', 'd3-tip' )
				.html( ( d ) => {
					const { value } = d;
					const textColor = this.mode === 'night' ? colors.nightTextDefault : colors.dayTextDefault;
					return `<span style='color:${textColor}'>` + value + "</span>"; //eslint-disable-line
				} );

			bars.call( tip );

			bars
				.on( 'mouseover', tip.show )
				.on( 'mouseout', tip.hide );

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
			const {
				l,
				barWidth,
				barSpacing,
				groupSpacing
			} = this;

			return l + ( barWidth * i ) + ( barSpacing * i ) + ( groupSpacing / 2 );
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

			return ( l + ( groupSpacing * i ) + ( groupWidth * i ) + ( groupWidth / 2 ) ) + ( groupSpacing / 2 );
		},

		getHeight( value ) {
			const { max } = this.range;

			// + this assumes that the bottom of the range
			// + is always zero
			return ( value / max ) * this.ah;
		},

	},

	components : {
		ChartLegend
	}

};

</script>

<style lang='scss'>
</style>
