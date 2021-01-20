<template lang="pug">
.line
    svg(
        ref='svg'
        :height='300'
        :width='80'
    )
</template>


<script>
import colors from '@/assets/js/colors';
import BaseChart from '@/components/charts/BaseChart';
import * as d3 from 'd3';

export default {
	name : 'Line',

	extends : BaseChart,

	props : {
		chartData : {
			type : Array,
		}
	},

	data : () => ( {

	} ),

	mount() {
		this.init( this.$refs.svg );
	},

	methods : {
		draw() {

		}
	}
};
</script>
<style lang="scss">
.line {
}
</style>
