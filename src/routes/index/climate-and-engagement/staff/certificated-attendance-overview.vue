<route>
{
	"meta" : {
		"topbarTitle" : "Staff Certificated Attendance Overview",
		"navOptions": {
			"title": "Certificated Attendance Overview",
			"icon" : "whatever"
		}
	}
}
</route>

<template lang='pug'>
.certificated-attendance-overview
	data-view-state-manager(
		:state='state'
		:error-message='errorMessage'
	)
		.content.dynamic-mode-background-secondary.floating-side-text(slot='loaded' v-if='data')
			.page-title
				p TEACHER
				p Attendance
			.top
				p.description Teacher attendance is directly related to student outcomes: the more teachers are absent, the more their students’ achievement suffers.
				.delivered
					p.value {{ data.avgInstructionalHours.value }}%
					p.text {{ data.avgInstructionalHours.label }}
			.bottom
				.not-delivered
					p.value {{ data.instructionalHoursNotDelivered.pct }}%
					.text
						span of Instructional Hours
						span.bold Not Delivered
				.equals
					.line
					p Equals
					.line
				.not-delivered
					p.value {{ data.instructionalHoursNotDelivered.num }}
					.text
						span of Instructional Hours
						span.bold Not Delivered
</template>

<script>
import { GetCertificatedAttendanceOverview } from '@/lib/API';
import DataViewLoader from '@/components/DataViewLoader';
import DataViewStateManager from '@/components/DataViewStateManager';

export default {
	name : 'certificated-attendance-overview',

	extends : DataViewLoader,

	data : () => ( {
		fetch : GetCertificatedAttendanceOverview,
	} ),

	components : {
		DataViewStateManager
	}
};
</script>

<style lang='scss'>
	@import '@/assets/scss/variables.scss';

	.certificated-attendance-overview {
		height: 100%;
		display: flex;
		flex-direction: column;

		.data-view-state-manager {
			flex: 1 1 0;

			.loaded-container,
			.content {
				height: 100%;
			}
		}

		.content {
			padding: 40px 60px 40px 40px;

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

			.top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 50px;

				.description {
					font-family: 'Roboto';
					font-style: normal;
					font-weight: normal;
					font-size: 18px;
					line-height: 162.5%;
					letter-spacing: 0.01em;
					color: $color-text-secondary;
					max-width: 500px;
					text-align: left;
					margin-right: 30px;
				}

				.delivered {
					display: flex;
					flex-direction: column;

					.value {
						font-family: 'Roboto';
						font-style: normal;
						font-weight: 900;
						font-size: 160px;
						line-height: 187px;
						text-align: right;
						color : #9D8C36;
					}

					.text {
						font-family: 'Roboto';
						font-style: normal;
						font-weight: 300;
						font-size: 33px;
						line-height: 110%;
						text-align: right;
						color: $color-text-secondary;
					}

				}
			}

			.bottom {
				display: flex;
				align-items: center;
				justify-content: space-evenly;

				.not-delivered {
					display: flex;
					flex-direction: column;

					.value {
						font-family: 'Roboto';
						font-style: normal;
						font-weight: 900;
						font-size: 70px;
						line-height: 162.5%;
						display: flex;
						align-items: center;
						text-align: center;
						letter-spacing: 0.01em;
						color: #000000;
					}

					.text {
						span {
							font-family: 'Roboto';
							font-style: normal;
							font-weight: 300;
							font-size: 14px;
							line-height: 131.5%;
							letter-spacing: 0.01em;
							color: $color-text-secondary;
						}
						span:last-child {
							margin-left: 2px;
							font-weight: bold;
						}
					}
				}

				.equals {
					display: flex;
					flex-direction: column;
					height: 100%;
					margin: 15px 0px;
					align-items: center;

					.line {
						border-left: 1px solid black;
						height: 50px;
					}

					p {
						font-family: 'Roboto';
						font-style: normal;
						font-weight: 900;
						font-size: 25px;
						line-height: 162.5%;
						display: flex;
						align-items: center;
						text-align: center;
						letter-spacing: 0.01em;
						color: #000000;
					}
				}
			}
		}

	}
</style>
