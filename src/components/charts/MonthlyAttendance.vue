<template lang='pug'>
.monthly-attendance-chart
	svg(:id='id' ref='svg')
</template>

<script>
import * as d3 from 'd3';
import colors from '@/assets/js/colors';
import BaseChart from './BaseChart';
import MonthLegend from './MonthLegend';
import TimelineGraph from './TimelineGraph';

export default {
	name    : 'monthly-attendance-chart',
	extends : BaseChart,

	props : {
		data : {
			type : Array,
		},
	},

	data : () => ( {
		monthlyDims : {
			w  : 0,
			h  : 0,
			l  : 0,
			r  : 0,
			b  : 0,
			t  : 0,
			aw : 0,
			ah : 0,
		},

		timelineHeight : 50,
	} ),

	mounted() {
		this.init( this.$refs.svg );
	},

	computed : {
		months() {
			// pull this out into another file where it can be imported
			return ['July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June'];
		},

		monthWidth() {
			const { aw } = this;
			const numOfMonths = this.months.length;
			return ( aw / ( numOfMonths - 1 ) );
		}
	},

	methods : {
		draw() {
			console.log( this.canvas );
			this.drawMonthLabels();
			const teacherGroups = this.drawLeftLabels();
			this.drawBarGroups();
			this.reArrangeMonthLabels();
			this.reArrangeMonthRectangles();
		},

		drawMonthLabels() {
			this.updateDims( {
				r : 20,
			} );

			// take our months
			const { months } = this;

			// add a wrapper for our months
			const monthsGroup = this.canvas
				.selectAll( '.months-group' )
				.data( months )
				.enter()
				.append( 'g' )
				.attr( 'class', this.parentId );

			// append the texts
			const monthLabels = monthsGroup.append( 'text' )
				.attr( 'class', `month-label-${this.id}` )
				.attr( 'x', ( d, i ) => this.getMonthLabelX( i ) )
				.attr( 'y', 100 )
				.attr( 'dominant-baseline', 'middle' )
				.attr( 'text-anchor', 'right' )
				.attr( 'transform', ( d, i ) => `rotate(-90, ${this.getMonthLabelX( i )}, 100)` )
				.text( month => month )
				.style( 'fill', this.mode === 'day' ? colors.grey : colors.white )
				.style( 'font-family', '"Roboto Slab", serif' );

			// change with our mode
			this.changeWithMode( {
				nodes   : monthLabels,
				options : {
					day : {
						style : [
							['fill', colors.grey]
						]
					},
					night : {
						style : [
							['fill', colors.white],
						]
					}
				}
			} );

			const rectangleWidth = ( this.monthWidth );

			// we're gonna rotate'em
			// we're gonna figure how "tall" they are
			// we're going to emit that data to the parent
			const rectangles = monthsGroup
				.append( 'rect' )
				.attr( 'class', `rect-${this.id}` )
				.attr( 'x', ( d, i ) => this.getMonthLabelX( i ) - ( rectangleWidth / 2 ) )
				.attr( 'y', 0 )
				.attr( 'height', this.ah )
				.attr( 'width', rectangleWidth )
				.style( 'fill', ( d, i ) => {
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

			this.reArrangeMonthLabels();

			this.$emit( 'stepComplete' );

		},

		drawLeftLabels() {
			const teacherGroups = this.canvas
				.selectAll( '.teacher-groups' )
				.data( this.data )
				.enter()
				.append( 'g' );

			// append labels
			const textNodes = teacherGroups
				.append( 'text' )
				.attr( 'x', this.l )
				.attr( 'y', ( d, i ) => this.getTeacherGroupT( i ) )
				.attr( 'dominant-baseline', 'hanging' )
				.attr( 'text-anchor', 'left' )
				.text( d => d.label )
				.style( 'fill', this.mode === 'day' ? colors.grey : colors.white );

			this.changeWithMode( {
				nodes   : textNodes,
				options : {
					day : {
						style : [
							['fill', colors.grey]
						]
					},
					night : {
						style : [
							['fill', colors.white]
						]
					}
				}
			} );

			const textWidths = Array.from( textNodes._groups[0] )
				.map( el => el.getBBox().width );

			const maxWidth = Math.max( ...textWidths );

			this.updateDims( {
				l : this.l + maxWidth + 15,
			} );

			return teacherGroups;
		},

		drawBarGroups() {
			const getX = ( d ) => {
				const startX = this.l;
				const endX = this.l + ( this.aw * d.xProportion );
				return {
					startX,
					endX,
				};
			};
			const barGroups = this.canvas
				.selectAll( '.bar-groups' )
				.data( this.data )
				.enter()
				.append( 'g' );

			const spaceBetweenLabelAndBar = 2;

			barGroups.append( 'rect' )
				.attr( 'x', this.l - 10 )
				.attr( 'y', ( d, i ) => this.getTeacherGroupT( i ) )
				.attr( 'width', this.monthWidth * 12 )
				.attr( 'fill', '#3F5356' )
				.attr( 'height', 10 );

		},

		getTeacherGroupT( i ) {
			return this.t + ( this.timelineHeight * i );
		},

		getMonthLabelX( i ) {
			// figure out our relevant constraints
			const { l, monthWidth } = this;

			return l + ( monthWidth * i );
		},

		createMonthGroups( data ) {
			return this.canvas
				.selectAll( '.month-groups' )
				.data( data )
				.enter()
				.append( 'g' )
				.attr( 'class', 'bar-groups' );
		},

		reArrangeMonthLabels( updateDims = true ) {
			const monthLabels   = d3.selectAll( `.month-label-${this.id}` );
			const elements      = Array.from( monthLabels._groups[0] );
			const elementWidths = elements.map( el => el.getBBox().width );

			const maxWidth = Math.max( ...elementWidths );

			monthLabels.attr( 'y', maxWidth + 15 )
				.attr( 'x', ( d, i ) => this.getMonthLabelX( i ) )
				.attr( 'transform', ( d, i ) => `rotate(-90, ${this.getMonthLabelX( i )}, ${maxWidth + 15})` );

			this.updateDims( {
				t : maxWidth + 30,
			} );
		},

		reArrangeMonthRectangles() {
			const rectangles = d3.selectAll( `.rect-${this.id}` );

			rectangles.attr( 'x', ( d, i ) => this.getMonthLabelX( i ) - ( this.monthWidth / 2 ) );
		},
	},

	components : {
		MonthLegend,
		TimelineGraph,
	}
};
</script>

<style lang='scss'>
.monthly-attendance-chart {

	svg {
		height: 100%;
		width: 100%;
	}
}
</style>
