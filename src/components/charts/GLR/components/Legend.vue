<template lang="pug">
.Legend
    h1 By Grade Level
    p TOP: Percent of students who are grade-level ready or exceeding grade-level expectations
    p BOTTOM: Percent of students within each of the five GLR achievement bands over 2-years.
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
		}
	},
	components : {
		ChartLegend
	}

};
</script>
