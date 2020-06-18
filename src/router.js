import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use( VueRouter );

const routes = [
	{
		path      : '/',
		name      : 'home',
		component : () => import( '@/routes/Home' ),
		children  : [
			{
				path      : '/student-success-indicator',
				name      : 'student-success-indicator',
				component : () => import( '@/routes/StudentSuccessIndicator' ),
			},
		],
	},
];

const router = new VueRouter( {
	mode : 'history',
	base : process.env.BASE_URL,
	routes,
} );

export default router;
