<template lang="pug">
	.census
		p Test
</template>

<script>
import { GetReport } from '@/lib/API';

export default {
	name : 'census',

	data : () => ( {
		censusData : {}
	} ),

	created() {
		GetReport().then( ( censusData ) => {
			this.censusData = censusData;
			console.log( censusData );
		} );
	}

};
</script>

<style lang="scss">

</style>
