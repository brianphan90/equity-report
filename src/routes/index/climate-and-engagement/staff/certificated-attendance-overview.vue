<route>
{
	"meta" : {
		"topbarTitle" : "Staff Certificated Attendance Overview",
		"navOptions": {
			"title" : "Certificated Attendance Overview",
			"icon"  : "whatever",
			"order" : 1
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
		.content.dynamic-mode-background-secondary.floating-side-text.content-card(slot='loaded' v-if='data')
			.page-title
				h1.main-title.dynamic-mode-text TEACHER
				h2.sub-title.dynamic-mode-text Attendance
			.top
				p.description.dynamic-mode-text Teacher attendance is directly related to student outcomes: the more teachers are absent, the more their students’ achievement suffers.
				.delivered
					p.value.accent {{ data.avgInstructionalHours.value }}%
					p.text.dynamic-mode-text {{ data.avgInstructionalHours.label }}
			.bottom
				.not-delivered
					p.value.accent {{ data.instructionalHoursNotDelivered.pct }}%
					.text
						span.dynamic-mode-text of Instructional Hours
						span.bold.dynamic-mode-text Not Delivered
				.equals
					.line
					p.dynamic-mode-text Equals
					.line
				.not-delivered
					p.value.accent {{ data.instructionalHoursNotDelivered.num }}
					.text
						span.dynamic-mode-text of Instructional Hours
						span.bold.dynamic-mode-text Not Delivered
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
			margin: 30px 30px 0 30px;

			.page-title {
				display: flex;

				.main-title {
					font-size: 52px;
					line-height: 69px;
					letter-spacing: 0.045em;
				}

				.sub-title {
					font-size: 52px;
					line-height: 69px;
				}
			}

			.top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 50px;

				.description {
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
						font-weight: 900;
						font-size: 160px;
						line-height: 187px;
						text-align: right;
					}

					.text {
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
						font-weight: 900;
						font-size: 70px;
						line-height: 162.5%;
						display: flex;
						align-items: center;
						text-align: center;
						letter-spacing: 0.01em;
					}

					.text {
						span {
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
