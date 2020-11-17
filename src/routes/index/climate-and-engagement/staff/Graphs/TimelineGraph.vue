<template lang="pug">

</template>

<script>
import * as d3 from 'd3';
import BaseChart from '@/components/charts/BaseChart';
import colors from '@/assets/js/colors';

export default {
	name : 'TimelineGraph',

	extends : BaseChart,

	props : {
		data : {
			type    : Object,
			default : () => ( {} )
		}
	},

	data : () => ( {
		axisIndicators : null,
		barGroups      : null,
	} ),

	computed: {
		
	}
};
</script>
