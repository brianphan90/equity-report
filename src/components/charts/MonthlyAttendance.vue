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

		leftLabelFontSize    : 16,
		barHeight            : 18,
		barIndicatorFontSize : 10,

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
		},

		columnWidth() {
			return ( this.aw / this.months.length );
		}
	},

	methods : {
		draw() {
			console.log( this.canvas );
			this.drawMonthLabels();
			const teacherGroups = this.drawLeftLabels();
			const barGroups = this.drawBarGroups();

			barGroups.forEach( ( group, i ) => this.drawBarIndicatorGroups( group, i ) );

			this.reArrangeMonthLabels();
			this.reArrangeMonthRectangles();
		},

		drawMonthLabels() {
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

			const rectangleWidth = ( this.columnWidth );

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
				.attr( 'y', ( d, i ) => this.getLeftLabelY( i ) )
				.attr( 'dominant-baseline', 'hanging' )
				.attr( 'text-anchor', 'left' )
				.text( d => d.label )
				.style( 'fill', this.mode === 'day' ? colors.grey : colors.white )
				.style( 'font-size', `${this.leftLabelFontSize}px` );


			// append bottom label for # of absences
			const absenceNodes = teacherGroups
				.append( 'text' )
				.attr( 'x', this.monthWidth * 8.5 )
				.attr( 'y', ( d, i ) => this.getLeftLabelY( i ) + 20 )
				.attr( 'dominant-baseline', 'middle' )
				.attr( 'text-anchor', 'start' )
				.attr( 'font-size', '10px' )
				.text( d => this.absenceLabel( d.numOfAbsecnes ) )
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
			const barGroups = this.canvas
				.selectAll( '.bar-groups' )
				.data( this.data )
				.enter()
				.append( 'g' );

			barGroups.append( 'rect' )
				.attr( 'x', this.l )
				.attr( 'y', ( d, i ) => this.getBarY( i ) )
				.attr( 'width', this.columnWidth * this.months.length )
				.attr( 'fill', '#3F5356' )
				.attr( 'height', this.barHeight );

			// TODO: Run some kind of callback here with some good arguments to it

			return Array.from( barGroups._groups[0] );
		},

		drawBarIndicatorGroups( group, rowNumber ) {
			const { __data__ : data } = group;
			const barGroup = d3.select( group );

			const barIndicatorData = this.getBarIndicatorGroupData( data );
			/**
			 * <g class='barGroup'>
			 * 		<g transform='translate(-10px)'>
			 *       <g>
			 *         <text>4</text>
			 *         <path d='[triangle]' />
			 *       </g>
			 *       <g>
			 *         <text>2</text>
			 *         <path d='[circle]' />
			 *       </g>
			 *    </g>
			 * <g>
			 */

			const indicatorGroup = barGroup
				.selectAll( `.indicators-${rowNumber}` )
				.data( barIndicatorData )
				.enter()
				.append( 'g' );

			const indicatorGroups = Array.from( indicatorGroup._groups[0] );
			indicatorGroups.forEach( iGroup => this.drawIndicators( iGroup, rowNumber ) );
		},

		getBarIndicatorGroupData( d ) {
			const { absences } = d.data;

			const absenceMap = absences.reduce( ( map, absence ) => {
				/* eslint-disable no-param-reassign */
				const { date, type } = absence;
				const month = new Date( date ).getMonth();

				if ( map[month] === undefined ) {
					map[month] = {};
				}

				if ( map[month][type] === undefined ) {
					map[month][type] = 0;
				}

				map[month][type] += 1;

				return map;
				/* eslint-enable no-param-reassign */
			}, {} );

			const monthKeys = Object.keys( absenceMap );
			return monthKeys.map( ( key ) => {
				const month = {
					month      : key,
					indicators : []
				};

				const map = absenceMap[key];
				if ( map.partialAbsence ) {
					month.indicators.push( {
						symbol : 'triangle',
						count  : map.partialAbsence,
					} );
				}

				if ( map.fullAbsence ) {
					month.indicators.push( {
						symbol : 'circle',
						count  : map.fullAbsence,
					} );
				}

				return month;
			} );
		},

		getBarY( rowNumber ) {
			return this.getLeftLabelY( rowNumber ) - ( this.leftLabelFontSize / 2 );
		},

		drawIndicators( group, rowNumber ) {
			const { __data__ : data } = group;
			const { month, indicators } = data;

			const indicatorGroup = d3.select( group );
			const textGroups = indicatorGroup
				.selectAll( `.label-group-${rowNumber}-${month}` )
				.data( indicators )
				.enter()
				.append( 'g' )
				.attr( 'class', `label-group-${rowNumber}-${month}` );

			// append the label
			const counts = textGroups
				.append( 'text' )
				.attr( 'x', ( d, i ) => this.getBarTextX( month, i ) )
				.attr( 'y', this.getBarY( rowNumber ) + ( this.barHeight / 2 ) )
				.attr( 'class', 'symbol-count' )
				.attr( 'dominant-baseline', 'middle' )
				.attr( 'text-anchor', 'left' )
				.style( 'fill', colors.white )
				.style( 'font-size', `${this.barIndicatorFontSize}px` )
				.text( d => d.count );

			// append the symbol
			const symbols = textGroups
				.append( 'path' )
				.attr( 'class', 'symbol' )
				.attr( 'd', ( d, i, datas, g ) => {
					const textSibling = textGroups._groups[0][i].children[0];
					const {
						x: textX,
						y: textY,
						width,
						height
					} = textSibling.getBBox();

					const x = textX + width + 3;
					const y = textY + ( height / 2 );

					return this.getPath( d.symbol, x, y );
				} )
				.style( 'fill', colors.white );

			// apply a transform (if we have to)
			const dims = indicatorGroup.node().getBBox();
			const { width } = dims;
			indicatorGroup
				.style( 'transform', `translate(-${width / 2}px, 0)` );
		},

		getPath( symbol, x, y ) {
			if ( symbol === 'triangle' ) {
				const triangleSideLength = 8;
				// get the height of the base
				const triangleHeight = Math.atan( 60 ) * ( triangleSideLength / 2 );

				const points = [];

				// make an isosceles triangle
				points.push( {
					x,
					y : y + ( triangleHeight / 2 ),
				} );

				points.push( {
					x : x + triangleSideLength / 2,
					y : y - ( triangleHeight / 2 ),
				} );

				points.push( {
					x : x + triangleSideLength,
					y : y + ( triangleHeight / 2 ),
				} );

				return this.pathFromPoints( points );
			}

			const r  = 4;
			const cx = x + r;
			const cy = y;

			return `
				M ${cx} ${cy}
				m -${r}, 0
				a ${r},${r} 0 1,0 ${r * 2},0
				a ${r},${r} 0 1,0 -${r * 2},0
			`;
		},

		getBarTextX( month, i ) {
			const { l, columnWidth } = this;

			const startOfMonth = l + ( columnWidth * month );
			const labelSpacing = ( columnWidth / 2 );

			return startOfMonth + ( columnWidth / 2 ) + ( labelSpacing * i );
		},

		getLeftLabelY( i ) {
			return this.t + ( this.timelineHeight * i );
		},

		getMonthLabelX( i ) {
			// figure out our relevant constraints
			const { l, columnWidth } = this;

			return l + ( columnWidth * i ) + ( columnWidth / 2 );
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

			rectangles
				.attr( 'x', ( d, i ) => this.getMonthLabelX( i ) - ( this.monthWidth / 2 ) )
				.attr( 'width', this.columnWidth );
		},

		absenceLabel( num ) {
			const firstPart = 'Number of Absences: ';
			const secondPart = num.toString();

			return firstPart.concat( secondPart );
		}
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
