const VueAutoRoutingPlugin = require( 'vue-auto-routing/lib/webpack-plugin' );

module.exports = {
	css : {
		loaderOptions : {
			// pass options to sass-loader
			sass : {
				// @/ is an alias to src/
				// so this assumes you have a file named `src/assets/variables.scss`
				prependData : '@import "@/assets/scss/variables.scss";'
			}
		}
	},

	configureWebpack : {

		plugins : [
			new VueAutoRoutingPlugin( {
				// Path to the directory that contains your page components.
				pages : 'src/routes',

				// A string that will be added to importing component path (default @/pages/).
				importPrefix : '@/routes/',

				// let's make it with a nice-a-spicy nested structure
				nested : true,
			} )
		],

	},

	chainWebpack : ( config ) => {
		config
			.plugin( 'html' )
			.tap( ( args ) => {

				const localArgs = [...args];

				localArgs[0].title = 'MUSD Equity Report';

				return args;

			} );
	}
};
