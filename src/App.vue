<template lang="pug">
#app(:class='mode')
	router-view
</template>

<script>
import { db } from '@/lib/db';
import { GetUser } from '@/lib/db/auth';
import { GetUserNode } from '@/lib/db/user';

export default {
	name : 'app',

	created() {

		db.child( 'versionNumber' )
			.on( 'value', () => {

				localStorage.setItem( 'musd-equity-report:show-change-log', 'false' );

			} );

		GetUser()
			.then( ( user ) => {
				if ( !user ) {
					return;
				}

				const { uid } = user;

				GetUserNode( uid )
					.then( ( dbUser ) => {
						this.$store.dispatch( 'setUser', dbUser );
					} );
			} );

	},

	computed : {

		user() {
			return this.$store.state.user;
		},

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
