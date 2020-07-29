import { auth } from '@/lib/db';

export const OnAuthStateChanged = callback => auth().onAuthStateChanged( callback );

export const SignIn = ( email, password ) => new Promise( ( resolve ) => {
	resolve( auth()
		.signInWithEmailAndPassword( email, password ) );
} );

export const SignOut = () => new Promise( () => {
	auth().signOut();
} );

export const PasswordReset = email => new Promise( ( resolve ) => {
	auth()
		.sendPasswordResetEmail( email )
		.then( () => email );

	resolve();
} );

export const GetUser = () => new Promise( ( resolve ) => {
	const killListener = auth()
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

export const SignInWithGoogle = () => {

	const provider = new auth.GoogleAuthProvider();

	return auth().signInWithPopup( provider )
		.then( ( { user } ) => user )
		.catch( err => console.log( err.message ) );

};
