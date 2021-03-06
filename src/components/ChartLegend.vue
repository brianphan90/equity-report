<template lang='pug'>
legend(:style='{ gridTemplateColumns }')
	.shaped
		.item(v-for='item in shapedItems')
			.shape(
				:class='[item.shape || "square", item.style]'
				:style='getStyle( item )'
			)
			.label
				label.dynamic-mode-text {{ item.label }}
				p.dynamic-mode-text.description(v-if='item.description') - {{ item.description }}
	.titled
		.item.titled-legend-item(
			v-for='( item, i ) in titledItems'
			:style='{ gridRowStart : numberOfRowsOfShapedItems + i + 1, gridColumn : `1 / ${numberOfColumns + 1}` }'
		)
			p.legend-item-title.dynamic-mode-text {{ item.title }}
			label.dynamic-mode-text {{ item.label }}
</template>

<script>
export default {
	name : 'chart-legend',

	props : {
		legend : {
			type     : [Object, Array],
			required : true,
		},

		columns : {
			type    : [Number, String],
			default : 4,
		}
	},

	computed : {

		gridTemplateColumns() {
			// console.log( this.legend );
			if ( typeof this.columns === 'string' ) {
				return this.columns;
			}

			let str = '';

			for ( let i = 0; i < this.columns; i += 1 ) {
				str += 'auto';

				if ( i < ( this.columns - 1 ) ) {
					str += ' ';
				}
			}

			return str;
		},

		numberOfColumns() {
			return this.gridTemplateColumns.split( ' ' ).length;
		},

		shapedItemKeys() {
			if ( Array.isArray( this.legend ) ) {
				return this.legend.map( ( item, i ) => i )
					.sort( ( a, b ) => a.order - b.order );
			}

			return Object.keys( this.legend ).filter( key => !this.legend[key].title )
				.sort( ( a, b ) => a.order - b.order );
		},

		remainderInFinalRow() {
			return this.shapedItemKeys.length % this.numberOfColumns;
		},

		numberOfRowsOfShapedItems() {
			return this.numberOfFullRowsOfShapedItems + ( this.remainderInFinalRow ? 1 : 0 );
		},

		numberOfFullRowsOfShapedItems() {
			return Math.floor( this.shapedItemKeys.length / this.numberOfColumns );
		},

		shapedItems() {
			const { numberOfColumns } = this;

			const shapedItems = [];

			// the idea is that we want the items to display top to bottom moving
			// on to another column once the first column is finished instead of
			// the default moving from one row to the next after the row is filled
			for ( let i = 0; i < this.shapedItemKeys.length; i += 1 ) {
				const colNum     = ( i % numberOfColumns );
				const rowNum     = Math.floor( i / numberOfColumns );
				let desiredIndex = ( colNum * this.numberOfFullRowsOfShapedItems ) + rowNum;

				if ( this.remainderInFinalRow && ( colNum + 1 ) > this.remainderInFinalRow ) {
					desiredIndex += 1;
				}

				shapedItems.push( this.legend[this.shapedItemKeys[desiredIndex]] );
			}

			// + Just wrote this and honestly, not fully sure how it works
			// *           `\_(^-^)_/` <( LOL! )


			return shapedItems;
		},

		titledItems() {
			if ( Array.isArray( this.legend ) ) {
				return this.legend.filter( item => item.title )
					.sort( ( a, b ) => a.order - b.order );
			}
			const keys = Object.keys( this.legend );
			console.log( keys );
			return keys.filter( key => this.legend[key].title )
				.map( key => this.legend[key] )
				.sort( ( a, b ) => a.order - b.order );
		}
	},

	methods : {
		getStyle( item ) {
			const color = item.legendColor || item.color;

			if ( item.style === 'striped' ) {
				return {
					border     : `2px solid ${color}`,
					background : `repeating-linear-gradient(
						transparent 4px,
						${color} 4px,
						${color} 5px,
						transparent 5px,
						transparent 7px,
						${color} 7px,
						${color} 8px
					)`
				};
			}

			return {
				backgroundColor   : color,
				borderBottomColor : color
			};
		},
	},
};
</script>

<style lang='scss'>
legend {
	display: grid;
	grid-column-gap: 10px;
	grid-row-gap: 5px;

	.item {
		display: flex;
		align-items: center;

		&:not(.titled-legend-item) + .titled-legend-item {
			margin-top: 15px;
		}

		.shape {
			margin-right: 10px;
		}

		p,
		label {
			text-align: left;
			font-size: 12px;
		}

		p {
			font-weight: 600;
		}

		p + label {
			margin-left: 10px;
		}

		.label {
			display: flex;

			.description {
				font-size: 12px;
				font-weight: normal;
				margin-left: 3px;
			}
		}
	}
}
</style>
