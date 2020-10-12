<template lang='pug'>
.caaspp-change-indicator
	.changes
		.change
			p.label.dynamic-mode-text E
			.triangle.dynamic-mode-text(:class='getTriangleClass( data.english )')
			p.value.dynamic-mode-text {{ data.english }}
		.change
			p.label.dynamic-mode-text M
			.triangle.dynamic-mode-text(:class='getTriangleClass( data.math )')
			p.value.dynamic-mode-text {{ data.math }}
	.score
		p.dynamic-mode-text {{ data.numOfScore }}
</template>

<script>
export default {
	name : 'caaspp-change-indicator',

	props : {
		data : {
			type     : Object,
			required : true,
		},
	},

	methods : {

		getTriangleClass( value ) {

			return value >= 0 ? 'positive' : 'negative';

		}
	}

};
</script>

<style lang='scss'>
.caaspp-change-indicator {
	display: flex;
	justify-content: center;

	.changes {
		display: flex;
		flex-direction: column;

		.change {
			display: flex;
			align-items: center;

			.label {
				width : 20px;
				font-size: 12px;
				margin-right: 5px;
			}

			.value {
				margin-left: 20px;
				flex: 1 1 0;
				text-align: end;
				font-size: 12px;
			}
		}
	}

	.score {
		margin-left: 10px;
		display: flex;
		padding: 8px;
		border : 2px solid #CDCDCD;
		align-items: center;
		justify-content: center;

		p {
			font-size: 12px;
		}
	}
}
</style>
