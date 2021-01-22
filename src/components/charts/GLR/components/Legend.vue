<template lang="pug">
.Legend
    h1 {{this.legendInfo.title}}
    p(v-for='item in this.legendInfo.paragraphs') {{ item }}
    ChartLegend(
        :legend='this.legend' :columns=2
    )
</template>


<script>
import ChartLegend from '@/components/ChartLegend';

export default {
	name : 'Legend',

	props : {
		legend : {
			type : Object,
		},
		legendInfo : {
			type : Object,
		}
	},
	components : {
		ChartLegend
	}

};
</script>
