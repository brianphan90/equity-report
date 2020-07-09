import Vue from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

export default new Vuex.Store( {
	state : {

		schoolSelectValue : '',

		user : {
			mode : '',
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

	},
	/* eslint-enable no-param-reassign */

	actions : {

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
