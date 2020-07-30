import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use( VueRouter );

// export const dataViews = [
// 	{
// 		path      : '/academics',
// 		name      : 'academics',
// 		component : () => import( '@/routes/Main' ),
// 		redirect  : '', // idk whatever route
// 		children  : [
// 			{
// 				path      : 'student-population-census',
// 				name      : 'Student Population Census',
// 				component : () => import( '@/routes/DataView' ),
// 				children  : [

// 				]
// 			}
// 		],
// 	}
// ];

const router = new VueRouter( {
	mode : 'history',
	base : process.env.BASE_URL,
	routes,
} );


router.beforeEach( ( to, from, next ) => {
	function hasQuery( query ) {
		return !!Object.keys( query ).length;
	}
	console.log( 'test' );
	if ( !hasQuery( to.query ) && hasQuery( from.query ) ) {
		return next( { name : to.name, query : from.query } );
	}

	return next();

} );

export default router;
