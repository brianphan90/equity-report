<route>
{
	"meta" : {
		"topbarTitle" : "Staff Classified Attendance Overview",
		"navOptions": {
			"title": "Classified Attendance Overview",
			"icon" : "whatever"
		}
	}
}
</route>

<template lang='pug'>
.classified-attendance-overview
	data-view-state-manager(
		:state='state'
		:error-message='errorMessage'
	)
		.content.dynamic-mode-background-secondary.floating-side-text(slot='loaded' v-if='data')
			.page-title
				p Classified
				p Attendance
			.employee-count
				.text
					span Attendance
					span Matters.
					span All Day,
					span every day.
				.count
					p.value 22
					p.label Classified Employees at Cesar Chavez Elementary
			.charts
				horizontal-striped-bar-chart.chart(
					v-for='item in data.charts'
					:data='item.data'
					:legend='item.legend'
					:title='item.title'
					:options='options'
				)

</template>

<script>
import { GetClassifiedAttendanceOverview } from '@/lib/API';
import DataViewLoader from '@/components/DataViewLoader';
import DataViewStateManager from '@/components/DataViewStateManager';
import HorizontalStripedBarChart from '@/components/charts/HorizontalStripedBarChart';

export default {
	name : 'classified-attendance-overview',

	extends : DataViewLoader,

	data : () => ( {
		fetch  : GetClassifiedAttendanceOverview,
		bValue : 0,
	} ),

	computed : {
		options() {
			return {
				maxTextLength   : 75,
				preferredBValue : this.bValue
			};
		}
	},

	components : {
		DataViewStateManager,
		HorizontalStripedBarChart
	}
};
</script>

<style lang='scss'>
.classified-attendance-overview {
	height: 100%;
	display: flex;

	.data-view-state-manager {
		flex: 1 1 0;

		.loaded-container,
		.content {
			height: 100%;
		}
	}

	.content {
		padding: 40px 60px 40px 40px;
		display: flex;
		flex-direction: column;

		.page-title {
			display: flex;

			p:first-child {
				font-family: 'Roboto Slab';
				font-style: normal;
				font-weight: bold;
				font-size: 52px;
				line-height: 69px;
				display: flex;
				align-items: center;
				letter-spacing: 0.045em;
				color: $color-text-secondary;
				margin-right: 10px;
			}

			p:last-child {
				font-family: 'Roboto Slab';
				font-style: normal;
				font-weight: 300;
				font-size: 52px;
				line-height: 69px;
				display: flex;
				align-items: center;
				color: $color-text-secondary;
			}
		}

		.employee-count {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 25px;

			.text {
				display: flex;
				flex-direction: column;

				span {
					text-align: start;
					font-family: 'Roboto';
					font-style: normal;
					font-weight: bold;
					font-size: 27px;
					line-height: 135%;
					letter-spacing: 0.01em;
					color: black;
				}

				span:nth-child(n+3) {
					font-style: normal;
					font-weight: normal;
					color: $color-text-secondary;
				}
			}

			.count {
				display: flex;
				flex-direction: column;
				align-items: flex-end;

				.value {
					font-family: 'Roboto';
					font-style: normal;
					font-weight: 900;
					font-size: 130px;
					line-height: 152px;
					display: flex;
					color: #9D8C36;
				}

				.label {
					font-family: 'Roboto';
					font-style: normal;
					font-weight: 300;
					font-size: 21px;
					line-height: 130.5%;
					display: flex;
					color: $color-text-secondary;
					max-width: 250px;
				}
			}

		}

		.charts {
			display: flex;
			flex: 1 1 0;
			margin-top: 15px;

			.chart {
				flex: 1 1 0;
				height: 100%;
			}
		}

	}

}
</style>
