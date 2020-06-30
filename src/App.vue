<template lang="pug">
#app(:class='mode')
	router-view
</template>

<script>
import { db } from '@/lib/db';

export default {
	name : 'app',

	created() {

		console.log( db );

		db.child( 'versionNumber' )
			.on( 'value', () => {

				localStorage.setItem( 'musd-equity-report:show-change-log', 'false' );

			} );

	},

	computed : {

		mode() {
			return this.$store.state.user.mode;
		},

	},
};
</script>

<style lang="scss">
@import '@/assets/scss/DEFAULT.scss';

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
