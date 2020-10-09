<template lang="pug">
	.college-tracker.dynamic-mode-background
		h1.title.dynamic-mode-text {{ title }}
		.chart
			svg(ref='svg')
</template>

<script>
import * as d3 from 'd3';
import BaseChart from '@/components/charts/BaseChart';
import colors from '@/assets/js/colors';

export default {
	name : 'college-tracker',

	extends : BaseChart,

	props : {
		title : {
			type : String
		}
	},

	data : () => ( {
		axisIndicators : null,
		barGroups      : null,
		bars           : null,
		icons          : [
			{
				label : 'CA Community (JC)',
				path  : '/img/jc.svg'
			},
			{
				label : 'CA State University (CSU)',
				path  : '/img/csu.svg'
			},
			{
				label : 'University of CA (UC)',
				path  : '/img/uc.svg'
			},
		]
	} ),

	computed : {
		barWidth() {
			const { aw, data } = this;
			return Math.min( aw / data.length, 30 );
		},

		dashedBarWidth() {
			return this.barWidth * 0.30;
		},

		solidBarWidth() {
			return this.barWidth * 0.70;
		},

		barSpacing() {
			const { barWidth, data, aw } = this;

			return ( aw - ( barWidth * data.length ) ) / data.length;
		},

		range() {
			const { data } = this;
			const values = data.map( d => d.value );
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
				t : 2,
				b : 2
			} );

			this.barGroups = this.createBarGroups( this.data );

			this.drawXAxisLabels();

			this.drawBars();

		},

		createBarGroups( data ) {
			return this.canvas
				.selectAll( '.bar-groups' )
				.data( data )
				.enter()
				.append( 'g' )
				.attr( 'class', 'bar-groups' );
		},

		drawXAxisLabels() {
			const xAxisLabels = this.barGroups
				.append( 'g' )
				.attr( 'class', 'x-axis-labels' );

			this.drawIcons( xAxisLabels );

			this.drawValueLabels( xAxisLabels );

		},

		drawBars() {
			const bars  = this.barGroups
				.append( 'g' )
				.attr( 'class', 'bars' );

			const dashedBars = bars.append( 'path' )
				.attr( 'd', ( d, i ) => {
					const height = this.getHeight( d.value );
					const startY = this.t + this.ah;
					const endY = this.getY( height );
					const x = this.getX( i );

					return `M ${x} ${startY} L ${x} ${endY}`;
				} )
				.style( 'stroke', d => d.color )
				.style( 'stroke-width', this.dashedBarWidth )
				.style( 'stroke-dasharray', '2 3' );

			const solidBars = bars.append( 'rect' )
				.attr( 'x', ( d, i ) => this.getX( i ) + this.dashedBarWidth / 2 )
				.attr( 'y', ( d ) => {
					const y = this.getY( this.getHeight( d.value ) );
					return y;
				} )
				.attr( 'fill', d => d.color )
				.attr( 'height', d => this.getHeight( d.value ) )
				.attr( 'width', d => this.solidBarWidth );


		},

		drawIcons( xAxisLabels ) {

			const iconLabels = xAxisLabels
				.append( 'text' )
				.attr( 'x', ( d, i ) => this.getXText( i ) )
				.attr( 'y', this.ah )
				.attr( 'text-anchor', 'middle' )
				.attr( 'dominant-baseline', 'text-after-edge' )
				.style( 'font-size', '10px' )
				.text( ( d, i ) => this.icons[i].label );

			this.changeWithMode( {
				nodes   : iconLabels,
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

			this.wrapText( iconLabels, 105 );

			const textNodes      = Array.from( iconLabels._groups[0] );
			const textNodeHeights = textNodes.map( node => node.getBBox().height );
			const largestHeight   = Math.max( ...textNodeHeights );

			this.updateDims( {
				b : this.b + largestHeight
			} );

			const icons = xAxisLabels
				.append( 'svg:image' )
				.attr( 'xlink:href', ( d, i ) => this.icons[i].path )
				.attr( 'width', this.barWidth )
				.attr( 'height', this.barWidth )
				.attr( 'x', ( d, i ) => this.getX( i ) )
				.attr( 'y', this.ah - this.barWidth );

			const paddingAboveIcon = 10;

			this.updateDims( {
				b : this.b + this.barWidth + paddingAboveIcon
			} );

		},

		drawValueLabels( xAxisLabels ) {
			const valueLabels = xAxisLabels
				.append( 'text' )
				.attr( 'x', ( d, i ) => this.getXText( i ) )
				.attr( 'y', this.ah )
				.attr( 'text-anchor', 'middle' )
				.style( 'font-size', '12px' )
				.text( d => `${d.value}%` );

			this.changeWithMode( {
				nodes   : valueLabels,
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

			const textNodes      = Array.from( valueLabels._groups[0] );
			const textNodeHeights = textNodes.map( node => node.getBBox().height );
			const largestHeight   = Math.max( ...textNodeHeights );

			this.updateDims( {
				b : this.b + largestHeight
			} );

		},

		realignXAxisLabels( xAxisLabels ) {

			const textNodes      = Array.from( xAxisLabels._groups[0] );
			const textNodeWidths = textNodes.map( node => node.getBBox().height );
			const largestWidth   = Math.max( ...textNodeWidths );

			if ( largestWidth > this.b ) {
				this.updateDims( {
					b : largestWidth,
				} );
			}

			xAxisLabels.selectAll( 'tspan' )
				.attr( 'y', this.ah );

			return this.b;
		},

		getXText( i ) {
			const {
				l,
				barWidth,
				barSpacing
			} = this;

			return ( l + ( barWidth * i ) + ( barSpacing * i ) + ( barWidth / 2 ) ) + ( barSpacing / 2 );
		},

		getX( i ) {
			const {
				l,
				barWidth,
				barSpacing,
			} = this;

			return l + ( barWidth * i ) + ( barSpacing * i ) + ( barSpacing / 2 );
		},

		getDashedX( i ) {
			const {
				l,
				dashedBarWidth,
				barSpacing,
			} = this;

			return l + ( dashedBarWidth * i ) + ( barSpacing / 2 );
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

<style lang="scss">
.college-tracker {
	padding: 20px;
	display: flex;
	flex-direction: column;

	.title {
		font-size: 16px;
		line-height: 15px;
		text-align: start;
		margin-bottom: 10px;
	}

	.chart {
		display: flex;
		flex: 1 1 0;

		svg {
			flex: 1 1 0;
		}
	}

}
</style>
