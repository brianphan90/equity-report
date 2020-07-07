const fs = require( 'fs' );
const { generateRoutes } = require( 'vue-route-generator' );

const dirs = fs.readdirSync( './src/routes' );

console.log( dirs );

const code = generateRoutes( {
	pages        : './src/routes',
	importPrefix : '@/routes/',
} );

fs.writeFileSync( './src/router/routes.js', `/* eslint-disable */\n${code}` );
