<template lang="pug">
	.guider
		.side
			.sections
				.section(v-for='section in sections')
					.steps
						.step
							p {{ section.title }}
						.step(v-for='step in  section.steps')
							p {{ step.title }}
			.button next
		router-view.view


</template>

<script>
export default {
	name : 'guider',

	props : {
		/*
			[
				{
					title : 'Student Poluation Census
					steps : [
						{ title : 'Overview' }
					]
				}
			]
		*/
		sections : {
			type : Array
		}
	},

	data : () => ( {
		currentSection : 0,
		currentStep    : 0,
	} ),

	created() {
	},

	methods : {
		next() {
		}
	}
};
</script>

<style lang="scss">
	.guider {
		background-color : #EFEFEF;;
		width : 100%;
		height: 100%;
		border-radius: 5px;
		overflow: hidden;
		display: flex;

		.side {
			height: 100%;
			width: 220px;
			background: linear-gradient(180deg, rgba(159, 206, 209, 0.26) 0%, #EACDA9 100%);

			.sections {

				.section {

					p {
						color : #555555
					}

					.steps {
						.step {
							cursor: pointer;
							padding : 5px;
						}
					}
				}
			}
		}

		.view {
			flex: 1 1 0;
		}
	}
</style>
