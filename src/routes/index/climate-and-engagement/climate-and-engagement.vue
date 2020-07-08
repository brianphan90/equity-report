<route>
{
	"redirect": "/climate-and-engagement/discipline/behavior-incidents-overview"
}
</route>

<template lang="pug">
	.climate-and-engagement
		graph-nav(:sections='sections')
		//- router-view
</template>

<script>

import GraphNav from '@/components/GraphNav';

export default {
	name : 'climate-and-engagement',

	props : {
	},

	data : () => ( {
		sections : [
			{
				title : 'Displine',
				steps : [
					{
						title : 'Behavior Incidents - Overview',
					}
				]
			},
			{
				title : 'Staff',
				steps : [
					{ title : 'Certificated Attendance - Overview' },
					{ title : 'Certificated Attendance - Disaggregated' },
					{ title : 'Classified Attendance - Overview' },
					{ title : 'Classified Attendance - Disaggregated' }
				]
			},
			{
				title : 'School Survey',
				steps : [
					{ title : 'School Survey Results' },
				]
			}
		]
	} ),

	created() {
	},

	components : {
		GraphNav,
	}

};
</script>

<style lang="scss">
	.academics {
		width: 100%;
		height: 100%;
	}
</style>
