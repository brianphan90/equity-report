<template lang="pug">
.chart
    svg(ref='svg')
</template>


<script>
import colors from '@/assets/js/colors';
import BaseChart from '@/components/charts/BaseChart';
import * as d3 from 'd3';

export default {
	name : 'TopStackedBoxPlotChart',

	extends : BaseChart,
	props   : {
		chartData : {
			type : Array,
		},
		legend : {
			type : Object,
		}
	},

	mounted() {
		this.init( this.$refs.svg );
	},

	computed : {
		columnWidth() {
			const { aw } = this;
			const numOfGrades = this.chartData.length;
			return ( aw / numOfGrades );
		},

	},

	methods : {
		draw() {
			// draw labels
			// set beginning dims
			this.updateDims( {
				t : 50,
			} );

			this.barGroups = this.createBarGroups( this.chartData );
			// draw labels
			const lineIndicators = this.drawAxisIndicators( {
				range : {
					min : 0,
					max : 100
				},
				axis     : 'y',
				postChar : '%',
				lines    : {
					spaceBetweenLabelsAndLines : 5,
					numberOfIndicators         : 6,
				},
				dayColor   : colors.grey,
				nightColor : colors.white,
			} );

			this.drawBars( this.barGroups );
			this.drawBarLabels( this.barGroups );
			const stackedBarData = this.computedStackedBarData( this.chartData );
			console.log( stackedBarData );
			const barGroups = stackedBarData.map( variety => this.drawStackedBar( this.barGroups, variety ) );
		},
		createBarGroups( data ) {
			return this.canvas
				.selectAll( '.grades-group' )
				.data( data )
				.enter()
				.append( 'g' )
				.attr( 'class', 'grades-groups' );


		},

		drawBars( barGroups ) {
			const rectangleWidth = ( this.columnWidth );

			// we're gonna rotate'em
			// we're gonna figure how "tall" they are
			// we're going to emit that data to the parent
			const rectangles = barGroups
				.append( 'rect' )
				.attr( 'class', `rect-${this.id}` )
				.attr( 'x', ( d, i ) => this.getMonthLabelX( i ) - ( rectangleWidth / 2 ) )
				.attr( 'y', 50 )
				.attr( 'height', this.ah )
				.attr( 'width', rectangleWidth )
				.style( 'fill', ( d, i, data, g ) => {
					if ( i % 2 ) {
						return this.mode === 'day' ? colors.dayTimeLightAccent : colors.nightTimeLightAccent;
					}

					return 'transparent';
				} )
				.lower();

			this.changeWithMode( {
				nodes   : rectangles,
				options : {
					day : {
						style : [
							['fill', ( d, i ) => ( i % 2 ? colors.dayTimeLightAccent : 'transparent' )]
						]
					},
					night : {
						style : [
							['fill', ( d, i ) => ( i % 2 ? colors.nightTimeLightAccent : 'transparent' )],
						]
					}
				}
			} );
		},
		drawBarLabels( barGroups ) {
			const barLabelGroups = barGroups
				.append( 'g' );

			const textLabels = barLabelGroups.append( 'text' )
				.attr( 'x', ( d, i ) => this.getX( i ) ) // add 5px
				.attr( 'y', d => 15 ) // static postition
				.attr( 'class', 'bar-value' )
				.attr( 'text-anchor', 'middle' )
				.attr( 'dominant-baseline', 'middle' )
				.style( 'fill', colors.white )
				.style( 'font-weight', 'bold' )
				.style( 'font-family', 'Roboto Slab' )
				.style( 'font-size', `${this.labelTextSize}px` )
				.text( d => this.getBarLabel( d.currentYearValue ) );

			const textDims = Array.from(
				textLabels._groups[0]
			).map(
				text => d3.select( text )
					.node()
					.getBBox()
			);

			const verticalPadding = 5;

			const maxTextWidth  = Math.max( ...textDims.map( dims => dims.width ) );
			const maxTextHeight = Math.max( ...textDims.map( dims => dims.height ) );

			const rectangleWidth = maxTextWidth + ( 3 * verticalPadding );
			const rectangleHeight  = maxTextHeight + ( 2 * verticalPadding );


			barGroups.append( 'rect' )
				.lower()
				.attr( 'x', ( d, i ) => this.getX( i ) - 25 )
				.attr( 'width', rectangleWidth )
				.attr( 'fill', '#5492B5' )
				.attr( 'height', rectangleHeight )
				.attr( 'y', d => 0 );
		},
		drawStackedBar( barGroups, data ) {
			const rectangleWidth = ( this.columnWidth / 2 );

			// we're gonna rotate'em
			// we're gonna figure how "tall" they are
			// we're going to emit that data to the parent

			const rectangles = data.map( ( item ) => {
				const rectangle = barGroups
					.append( 'rect' )
					.attr( 'x', item.x )
					.attr( 'y', item.y )
					.attr( 'fill', item.color )
					.attr( 'opacity', 0.80 )
					.attr( 'height', item.height )
					.attr( 'width', rectangleWidth );

				return rectangle;

			} );

		},
		computedStackedBarData( data ) {


			const result = data.map( ( item, index ) => {
				// array of measurements


				const arrayOfScores = Object.keys( item.data );
				let runningSum = 0;
				// we know all the charts are gonna be out 100
				const sum = arrayOfScores.reduce( ( total, j ) => total + item.data[j], 0 );
				return arrayOfScores.map( ( key ) => {
				// get the value and the height
					const value  = item.data[key];
					const height = ( value / this.ah ) * this.ah;

					console.log( `height for ${key}`, height );
					// determine the1 y value for the bar;
					// const y = this.t + ( ( runningSum / sum ) * this.ah );
					const y = ( this.t + this.ah ) - ( runningSum + height );
					console.log( `y for ${key}`, y );
					// add to running sum so we can
					// do y value calc ulations
					runningSum += value;
					return {
						width : this.aw - 60, // 30px on each side
						color : this.legend[key].color,
						text  : `${value}%`,
						x     : this.getX( index ) - this.columnWidth / 4,
						y,
						height,
					};
				} );

			} );

			return result;
		},
		getBarLabel( item ) {

			const label = Math.round( item ).toString();
			return label.concat( '%' );
		},
		getX( i ) {
			const { columnWidth } = this;

			return this.l + ( columnWidth * i ) + ( columnWidth / 2 );
		},

		getYForCircle( value ) {


			return 100 - value + this.t;
		},

		getMonthLabelX( i ) {
			// figure out our relevant constraints
			const { l, columnWidth } = this;

			return l + ( columnWidth * i ) + ( columnWidth / 2 );
		},
	}

};

</script>

<style lang="scss">
.chart {

	svg {
		height: 100%;
		width: 100%;
	}

}
</style>
