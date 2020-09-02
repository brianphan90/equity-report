require( 'dotenv' ).config( { path : '.env' } );

const https   = require( 'https' );
const express = require( 'express' );
const fs      = require( 'fs' );
const path    = require( 'path' );

const expressStaticGzip = require( 'express-static-gzip' );

const app = express();

app.use( '/', expressStaticGzip( path.join( __dirname, 'dist' ), { index : ['index.html'] } ) );

app.use( '*', ( req, res ) => {
	res.sendFile( path.join( __dirname, 'dist/index.html' ) );
} );

const env  = process.env.NODE_ENV;
const port = process.env.PORT;

let R = null;
let r = null;

/* eslint-disable no-new */
new Promise( ( resolve, reject ) => {
	R = resolve;
	r = reject;
} );

switch ( env ) {

	default: {

		const sslOptions = {
			cert : fs.readFileSync( path.resolve( 'build/certs/madera.crt' ) ),
			key  : fs.readFileSync( path.resolve( 'build/certs/maderaKey.key' ) )
		};


		https.createServer( sslOptions, app ).listen( port, () => {
			console.info( `secure server on port ${port} with env ${env}` );

			R();
		} );

		break;
	}

}

module.exports = {
	resolve : R,
	reject  : r,
};
