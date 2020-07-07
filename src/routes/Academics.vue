<template lang="pug">
	.academics
		guider(:sections='sections')
</template>

<script>

import Guider from '@/components/Guider';

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
		Guider,
	}

};
</script>

<style lang="scss">
	.academics {
		width: 100%;
		height: 100%;
	}
</style>
