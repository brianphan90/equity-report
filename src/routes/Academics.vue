<template lang="pug">
	.academics
		graph-nav(:sections='sections')
</template>

<script>

import GraphNav from '@/components/GraphNav';

export default {
	name : 'academics',

	props : {
	},

	data : () => ( {
		sections : [
			{
				title : 'Student Population Census',
				steps : [
					{
						title : 'By Grade Level and Subgroup',
						path  : 'census-gl-subgroup'
					}
				]
			},
			{
				title : 'Grade Level Readiness',
				steps : [
					{ title : 'Overview' },
					{ title : 'By Grade Level and Subgroup' },
					{ title : 'By Classroom' }
				]
			},
			{
				title : 'CAASPP',
				steps : [
					{ title : 'By Grade Level and Subgroup' },
					{ title : 'By Classroom' }
				]
			},
			{
				title : 'ELPAC',
				steps : [
					{ title : 'By Grade Level Subgroup' },
					{ title : 'By Classroom' }
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
