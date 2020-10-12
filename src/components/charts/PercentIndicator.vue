<template lang='pug'>
.percent-indicator
	p.title.dynamic-mode-text Current Year
	.row
		.percent
			p.value {{ percents.farBelowOrBelow }}%
			p.label.dynamic-mode-text Far Below or Below
		.line
		.percent
			p.value {{ percents.readyOrExceeding }}%
			p.label.dynamic-mode-text Ready or Exceeding
</template>

<script>
export default {
	name : 'percent-indicator',

	props : {
		percents : {
			type     : Object,
			required : true,
		},
	},
};
</script>

<style lang='scss'>
.percent-indicator {
	padding: 20px;

	.title {
		font-weight: 500;
		font-size: 12px;
		line-height: 11px;
		margin-bottom: 10px
	}

	.line {
		border-left: 1px solid black;
		height: 20px;
	}


	.row {
		display: flex;
		align-items: center;
		justify-content: space-evenly;

		.percent {

			.value {
				font-weight: 900;
				font-size: 17px;
				line-height: 20px;
				color: #D8A556;
				letter-spacing: 0.075em;
			}

			.label {
				font-size: 12px;
			}

		}
	}
}
</style>
