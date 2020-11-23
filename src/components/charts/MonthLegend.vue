<script>
import * as d3 from 'd3';
import BaseChart from '@/components/charts/BaseChart';
import colors from '@/assets/js/colors';

export default {
	name    : 'MonthLegend',
	extends : BaseChart,

	props : {
		svg : {
			required : true,
		},
		dims : {
			required : true,
		}
	},

	computed : {
		months() {
			// pull this out into another file where it can be imported
			return ['July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June'];
		}
	},

	methods : {
		draw() {
			// take our months
			const { months } = this;

			console.log( 'hi' );

			// add a wrapper for our months
			const monthsGroup = this.canvas
				.selectAll( '.months-group' )
				.data( months )
				.enter()
				.append( 'g' );

			// append the texts
			monthsGroup.append( 'text' )
				.attr( 'x', ( d, i ) => this.getX( i ) )
				.attr( 'y', 0 )
				.text( month => month );

			// we're gonna rotate'em
			// we're gonna figure how "tall" they are
			// we're going to emit that data to the parent
		},

		getX( i ) {
			// figure out our relevant constraints
			const { aw, l }   = this;
			const numOfMonths = this.months.length;
			const monthWidth  = ( aw / ( numOfMonths - 1 ) );

			return l + ( monthWidth * 1 );
		},
		createMonthGroups( data ) {
			return this.canvas
				.selectAll( '.month-groups' )
				.data( data )
				.enter()
				.append( 'g' )
				.attr( 'class', 'bar-groups' );
		}
	}
};
</script>
