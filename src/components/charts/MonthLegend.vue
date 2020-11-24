<script>
import BaseChart from '@/components/charts/BaseChart';
import colors from '@/assets/js/colors';

export default {
	name    : 'MonthLegend',
	extends : BaseChart,

	props : {
		dims : {
			required : true,
		},
		parentId : {
			type : String,
		},
		svg : {
			required : true,
		},
		step : {
			type     : Number,
			required : true,
		}
	},

	watch : {
		svg : {
			immediate : true,
			handler( svg ) {
				if ( svg ) {
					this.$nextTick( () => this.init( this.svg ) );
				}
			},
		},
	},

	computed : {
		months() {
			// pull this out into another file where it can be imported
			return ['July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June'];
		},

		monthWidth() {
			const { aw } = this;
			const numOfMonths = this.months.length;
			return ( aw / ( numOfMonths - 1 ) );
		}
	},


};
</script>
