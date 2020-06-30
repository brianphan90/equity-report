require( 'dotenv' ).config( './.env' );

const admin          = require( 'firebase-admin' );
const serviceAccount = require( './private/service-account.json' );

admin.initializeApp( {
	credential  : admin.credential.cert( serviceAccount ),
	databaseURL : 'https://musd-equity-report.firebaseio.com',
} );

const packageJSON = require( './package.json' );

const updateVersionNumber = () => admin.database()
	.ref( '/' )
	.child( 'versionNumber' )
	.set( ( parseFloat( packageJSON.version ) ) );

updateVersionNumber()
	.then( () => {

		localStorage.setItem( 'musd-equity-report:show-change-log', 'true' );
		localStorage.setItem( 'musd-equity-report:version', snapshot.val() );

		process.exit( 0 );

	} )
	.catch( ( err ) => {
		console.error( err );
		process.exit( 3 );
	} );
