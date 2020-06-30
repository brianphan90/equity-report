import { _auth } from '@/lib/db';

export const OnAuthStateChanged = callback => _auth.onAuthStateChanged( callback );

export const SignIn = ( email, password ) => new Promise( ( resolve ) => {
	resolve( _auth
		.signInWithEmailAndPassword( email, password ) );
} );

export const SignOut = () => new Promise( () => {
	_auth.signOut();
} );

export const PasswordReset = email => new Promise( ( resolve ) => {
	_auth
		.sendPasswordResetEmail( email )
		.then( () => email );

	resolve();
} );

export const GetUser = () => new Promise( ( resolve ) => {
	const killListener = _auth
		.onAuthStateChanged( ( user ) => {

			resolve( user );

			killListener();

		} );

} );

export const GetCurrentUserToken = () => new Promise( ( resolve, reject ) => {

	GetUser()
		.then( user => user.getIdToken( true ) )
		.then( resolve )
		.catch( reject );

} );
