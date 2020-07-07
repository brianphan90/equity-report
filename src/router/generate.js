const fs = require( 'fs' );
const { generateRoutes } = require( 'vue-route-generator' );

const code = generateRoutes( {
	pages        : './src/routes',
	importPrefix : '@/routes/',
	// nested : true,
} );

fs.writeFileSync( './src/router/routes.js', `/* eslint-disable */\n${code}` );
