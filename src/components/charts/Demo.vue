<template lang='pug'>
.demo
	svg(ref='svg')
		timeline-chart(
			v-for='( teacher, i ) in data.teachers'
			:teacher='teacher'
			:t='getT(i)'
			:b='getB(i)'
			:l='childL'
			:r='0'
		)
</template>

<script>
import BaseChart from '@/components/charts/BaseChart';
import TimelineChart from '@/components/charts/TimelineChart';
import { months } from '@/utils/time';

export default {
	extends : BaseChart,

	props : {
		data : {
			type    : Object,
			default : () => ( {
				teachers : [
					{
						name     : 'Blah',
						absences : [
							{
								type : 'full', // full | partial
								date : 175038492838, // unix time string
							}
						]
					}
				]
			} ),
		}
	},

	methods : {
		draw() {
			this.drawMonths( months );
		},

		drawMonths( months ) {
			// draw each label
			// - apply rotations (you must apply degrees and fulcrum)

			// determine the max height of
			// the text item

			// update your "dims" to reflect that
			// the top n number of pixels can no
			// longer be used to draw
			this.updateDims( {
				t : 420
			} );
		},
	},

	components : {
		TimelineChart,
	}
};
</script>
