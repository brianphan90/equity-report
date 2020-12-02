<template lang="pug">
.attendance-disaggregate-wrapper
		monthly-attendance(
			:data='dataForFirstGraph'
			v-if="this.origin == 'classified'"
		)
		monthly-attendance(
			:data='dataForSecondGraph'
			v-if="this.origin == 'classified'"
		)
		monthly-attendance-certificated(
			:data='dataForFirstGraph'
			v-if="this.origin == 'certificated'"
		)
		monthly-attendance-certificated(
			:data='dataForSecondGraph'
			v-if="this.origin == 'certificated'"
		)
</template>
<script>
import MonthlyAttendance from './MonthlyAttendance';
import MonthlyAttendanceCertificated from './MonthlyAttendanceCertificated';

export default {
	name : 'attendance-disaggregate-wrapper',

	props : {
		chart : {
			type : [Array, Object],
		},

		//  checking origin to know which chart to render nothing complex
		//  it was done this way and using two components so when there are requested fixes on specific chart we can access the component
		//  without debugging if else statements
		origin : {
			type : String
		}
	},

	computed : {
		dataForFirstGraph() {
			const half = Math.ceil( this.chart.data.length / 2 );
			return this.chart.data.slice( 0, half );
		},

		dataForSecondGraph() {
			const half = Math.ceil( this.chart.data.length / 2 );
			return this.chart.data.slice( half, this.chart.data.length );
		}
	},
	components : {
		MonthlyAttendance,
		MonthlyAttendanceCertificated,
	}
};
</script>

<style lang="scss">
.attendance-disaggregate-wrapper {
	height: 100%;
	display: flex;
	align-items: stretch;
	overflow: auto;

	.monthly-attendance-chart {
		height: 100%;
		flex: 1 1 0;

		+ .monthly-attendance-chart {
			margin-left: 30px;
		}
	}

	.label-wrapper {
		padding: 10px;
		margin: 10px 0;
		border: 7px solid $color-neutral-light;
		border-right: 0;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
	}
}
</style>
