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
				path      : 'equity-report',
				name      : 'Equity Report',
				component : () => import( '@/routes/EquityReport' ),
				children  : [
					{
						path      : 'academics',
						component : () => import( '@/routes/Academics' ),
						children  : [
							{
								path      : 'census-gl-subgroup',
								name      : '',
								component : () => import( '@/routes/CensusGlSubgroup' ),
							},
						]
					},
					{
						path      : 'climate',
						component : () => import( '@/routes/Climate' ),
					}
				]
			}
		]
	},
	// { // To catch any undefined path and redirect it
	// 	path     : '*',
	// 	redirect : '/'
	// }
];

const router = new VueRouter( {
	mode : 'history',
	base : process.env.BASE_URL,
	routes,
} );

export default router;
