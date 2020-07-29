import Vue from 'vue';
import Vuex from 'vuex';

import { SignInWithGoogle } from '@/lib/db/auth';
import { GetUserNode, WriteUser } from '@/lib/db/user';
import { db } from '@/lib/db';

Vue.use( Vuex );

export default new Vuex.Store( {
	state : {

		schoolSelectValue : '',

		user : {
			name : false,
			mode : 'day'
		},

		filters : [],

	},

	/* eslint-disable no-param-reassign */
	mutations : {

		setSchoolSelectValue( state, school ) {

			state.schoolSelectValue = school;

		},

		setMode( state, mode ) {

			console.log( 'Update state.user.mode = ', mode );

			state.user.mode = mode;

		},

		setNavClosed( state, closed ) {

			state.user.navClosed = closed;

		},

		setNavItemState( state, itemState ) {

			state.user.navItemState = itemState;

		},

		setUser( state, user ) {
			const mode = state.user;
			state.user = { mode, ...user };
		}

	},
	/* eslint-enable no-param-reassign */

	actions : {

		async login( store ) {

			// call fb sign in with google
			const user = await SignInWithGoogle();

			if ( !user ) {
				console.warn( 'something went wrong with the login' );
				return null;
			}

			const { displayName, email, photoURL } = user;

			// check for fb user node
			const { uid } = user;
			const dbUser = await GetUserNode( uid );

			const userToSet = dbUser || {
				email,
				uid,
				name     : displayName,
				photoUrl : photoURL
			};

			// make fb user node if it is the first time logging in
			if ( !dbUser ) {
				WriteUser( uid, userToSet );
			}

			// set user
			store.commit( 'setUser', userToSet );

			return userToSet;

		},

		setUser( store, user ) {
			store.commit( 'setUser', user );
		},

		setSchoolSelectValue( store, school ) {

			store.commit( 'setSchoolSelectValue', school );

		},

		setMode( store, mode ) {
			console.log( 'setMode', mode );

			store.commit( 'setMode', mode );

		},

		setNavClosed( store, closed ) {

			store.commit( 'setNavClosed', closed );

		},

		setNavItemState( store, itemState ) {

			store.commit( 'setNavItemState', itemState );

		},

	},
} );
