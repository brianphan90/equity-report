<template lang='pug'>
.caaspp-change-indicator
	.changes
		.change
			p.label E
			.triangle(:class='getTriangleClass( data.english )')
			p.value {{ data.english }}
		.change
			p.label M
			.triangle(:class='getTriangleClass( data.math )')
			p.value {{ data.math }}
	.score
		p {{ data.numOfScore }}
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
