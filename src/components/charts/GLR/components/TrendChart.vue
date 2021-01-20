<template lang="pug">
.trendChart
    svg(
        ref='svg'
    )
</template>


<script>
import colors from '@/assets/js/colors';
import BaseChart from '@/components/charts/BaseChart';
import * as d3 from 'd3';

export default {
	name : 'TrendChart',

	extends : BaseChart,

	props : {
		currentYear : {
			type : Array,
		},
		priorYear : {
			type : Array,
		}
	},

	data : () => ( {
		leftLabelFontSize    : 16,
		barHeight            : 30,
		barIndicatorFontSize : 10,
	} ),

	mounted() {
		this.init( this.$refs.svg );
	},

	computed : {
		columnWidth() {
			const { aw } = this;
			const numOfGrades = this.currentYear.length;
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


			this.barGroups = this.createBarGroups( this.currentYear );

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

			this.drawCircles( this.barGroups );

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
				.attr( 'x', ( d, i ) => this.getX( i ) )
				.attr( 'y', d => 10 )
				.attr( 'class', 'bar-value' )
				.attr( 'text-anchor', 'middle' )
				.attr( 'dominant-baseline', 'middle' )
				.style( 'fill', colors.white )
				.style( 'font-weight', 'bold' )
				.style( 'font-family', 'Roboto Slab' )
				.style( 'font-size', `${this.labelTextSize}px` )
				.text( d => d.label );

			const textDims = Array.from(
				textLabels._groups[0]
			).map(
				text => d3.select( text )
					.node()
					.getBBox()
			);

			const verticalPadding = 10;

			const maxTextWidth  = Math.max( ...textDims.map( dims => dims.width ) );
			const maxTextHeight = Math.max( ...textDims.map( dims => dims.height ) );

			const rectangleWidth = maxTextWidth + ( 3 * verticalPadding );
			const rectangleHeight  = maxTextHeight + ( 2 * verticalPadding );


			barGroups.append( 'rect' )
				.lower()
				.attr( 'x', ( d, i ) => this.getX( i ) - 20 )
				.attr( 'width', rectangleWidth )
				.attr( 'fill', d => d.color )
				.attr( 'height', rectangleHeight )
				.attr( 'y', d => 0 );
		},

		drawCircles( barGroups ) {

			const nodes = [];
			const links = [];

			this.currentYear.forEach( ( item, index ) => {
				nodes.push( [this.getX( index ), this.getYForCircle( item.value )] );

			} );

			for ( let i = 0; i < nodes.length - 1; i++ ) {
				links.push(
					d3.linkHorizontal()( {
						source : nodes[i],
						target : nodes[i + 1]
					} )
				);
			}
			nodes.forEach( ( item, index ) => {
				barGroups
					.append( 'circle' )
					.style( 'stroke', 'gray' )
					.style( 'fill', 'white' )
					.attr( 'r', ( d, i ) => 5 )
					.attr( 'cx', nodes[index][0] )
					.attr( 'cy', nodes[index][1] );
			} );

			// Append the links to the svg element
			for ( let i = 0; i < links.length; i++ ) {
				barGroups
					.append( 'path' )
					.attr( 'd', links[i] )
					.attr( 'stroke', 'green' )
					.attr( 'fill', 'none' );
			}
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
.trendChart {

	svg {
		height: 100%;
		width: 100%;
	}

}
</style>
