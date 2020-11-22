<template lang="pug">
	.chart
		svg(
			ref='svg'
			height='75'
			width='500'
		)
</template>

<script>
import * as d3 from 'd3';
import BaseChart from '@/components/charts/BaseChart';
import HorizontalStripedBarChart from '@/components/charts/HorizontalStripedBarChart';
import colors from '@/assets/js/colors';

export default {
	name : 'TimelineGraph',

	extends : BaseChart,

	props : {
		item : {
			type    : Object,
			default : () => ( {} )
		}
	},

	data : () => ( {
		axisIndicators  : null,
		barGroups       : null,
		xAxisLabels     : null,
		yAxisLabels     : null,
		barLabelSpacing : 5
	} ),

	computed : {
		barWidth() {
			return 5;
		},
		numberOfBarsInGroups() {
			return 2;
		},
		barSpacing() {
			// based of multiline bar
			return 2;
		},
		spaceBetweenBars() {
			return this.numberOfBarsInGroups * this.barSpacing;
		},
		groupWidth() {
			const { barWidth, numberOfBarsInGroups, spaceBetweenBars } = this;

			const groupWidth = ( barWidth * numberOfBarsInGroups ) + spaceBetweenBars;
			return groupWidth;
		},
		groupSpacing() {
			const sumOfGroupWidths = ( this.groupWidth * this.data.length );
			const groupSpacing = ( this.aw - sumOfGroupWidths ) / ( this.data.length );
			return groupSpacing;
		},

	},

	mounted() {
		this.init( this.$refs.svg, {
			t : 1,
			b : 1
		} );
	},

	methods : {
		computeBarData( data ) {
			// we are passing array but we have to check two cases to check if it comes from certificated or classified
			/* eslint-disable */
			const totalInstruction = data[0].totalInstruction;
			if ( totalInstruction ) {
				return data.map( ( item ) => {
					const {
						label,
						full, 
						partial, 
						totalInstruction,
					} = item; 
					
					/* eslint-disable */ 
					const absences = item.data.absences;
					const value = 100;
					const colorforSolidLine = '#9E5A46';
					return {
						label,
						value,
						absences,
						full,
						partial,
						totalInstruction,
						colorforSolidLine
					}
				})
			} else {
				return data.map( ( item ) => {
					const {
						label,
						numOfAbsecnes
					} = item;
					/* eslint-disable */ 
					const absences  = item.data.absences;

					const colorforSolidLine = '#9E5A46';
					// temp fix passing in 100 because doing classified first

					const value = 100;

					return {
						label,
						value,
						absences,
						numOfAbsecnes,
						colorforSolidLine,
					}
				} );
			}
		},
		computeBarDataItem( item ) {
			const totalInstruction = item.totalInstruction;
			if ( totalInstruction ) {
				const {
					label,
					full, 
					partial, 
					totalInstruction,
				} = item; 
					
				/* eslint-disable */ 
				const absences = item.data.absences;
				const value = 100;
				const colorforSolidLine = '#9E5A46';
				return [{
					label,
					value,
					absences,
					full,
					partial,
					totalInstruction,
					colorforSolidLine
				}]
			} else {
				const {
					label,
					numOfAbsecnes
				} = item;
				/* eslint-disable */ 
				const absences  = item.data.absences;

				const colorforSolidLine = '#9E5A46';
				// temp fix passing in 100 because doing classified first

				const value = 100;

				return [{
					label,
					value,
					absences,
					numOfAbsecnes,
					colorforSolidLine,
				}]				
			}
		},
		draw() {

			// format array with all needed poroperties

			const barData = this.computeBarDataItem( this.item );

			this.barData = barData;

			console.log( 'barGroupsdata', barData );

			this.barGroups = this.createBarGroup( barData );

			console.log('barGrouops', this.barGroups );

			this.drawTimelineGraph( this.barGroups );

		},
		drawTimelineGraph ( barGroups ) {
			console.log( 'bargroups', barGroups );
			this.barLabelGroups = barGroups
				.append( 'g' );

			this.barLabelGroups.append( 'rect' )
				.attr( 'x', 40 )
				.attr( 'y',  10 )
				.attr( 'width', 5 )
				.attr( 'fill', '#9E5A46' )
				.attr( 'height', 100 );
	
			this.yAxisLabels = barGroups
				.append( 'text' )
				.attr( 'class', 'y-axis-labels' )
				.attr( 'x', 0 )
				.attr( 'y', 20 )
				.attr( 'text-anchor', 'start' )
				.attr( 'dominant-baseline', 'middle' )
				.attr( 'font-size', '12px' )
				.text( d => d.label );
		},
		createBarGroup( barData ) {
			return this.canvas.selectAll( `bars-${this.id}` )
				.data( barData )
				.enter()
				.append( 'g' );
		},
		getTextX( i ) {
			const {
				l,
				barWidth,
				barSpacing
			} = this;
			const TextX = ( l + ( barWidth * i ) + ( barSpacing * i ) + ( barWidth / 2 ) ) + ( barSpacing / 2 );
			console.log( TextX );
			return TextX;
		},
		getX( i ) {
			const {
				l,
				barWidth,
				barSpacing,
			} = this;

			return l + ( barWidth * i ) + ( barSpacing * i ) + ( barSpacing / 2 );
		},
		getY( height ) {
			const { ah, t } = this;

			return ah + t - height;
		},
		getHeight( value ) {
			const { max } = this.range;

			// + this assumes that the bottom of the range
			// + is always zero
			return ( value / max ) * this.ah;
		}

	}
};
</script>

<style lang='scss'>
	.chart {
		width: 100%;
		flex: 1 1 0;

		svg {
			width: 100%;
			height: 1000;
		}
	}

</style>
