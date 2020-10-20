<template lang='pug'>
.caaspp-change-indicator
	.changes
		.change
			p.label.dynamic-mode-text E
			p.value.dynamic-mode-text(:class='getClass( data.english )') {{ data.english }}
		.change
			p.label.dynamic-mode-text M
			p.value.dynamic-mode-text(:class='getClass( data.math )') {{ data.math }}
	.score-wrapper
		p.label.dynamic-mode-text Total Scores
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

		getClass( value ) {

			if ( value === 0 ) {
				return '';
			}

			return value >= 0 ? 'positive' : 'negative';

		}
	}

};
</script>

<style lang='scss'>
.caaspp-change-indicator {
	display: flex;
	justify-content: space-between;

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

				&::before {
					margin-right: 2px;
				}

				&.positive {
					&::before {
						content: '+';
					}
				}

				&.negative {
					&::before {
						content: '-';
					}
				}
			}
		}
	}

	.score-wrapper {
		display: flex;
		flex-direction: column;

		p {
			font-size: 12px;
		}

		.label {
			font-size: 12px;
		}

		.score {
			margin-left: 10px;
			display: flex;
			padding: 5px;
			border : 2px solid #CDCDCD;
			align-items: center;
			justify-content: center;

			p {
				font-size: 12px;
			}
		}
	}

}
</style>
