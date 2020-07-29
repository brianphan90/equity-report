import { db } from '@/lib/db';

export const GetUserNode = uid => db
	.child( 'users' )
	.child( uid )
	.once( 'value' )
	.then( snapshot => snapshot.val() );


export const WriteUser = ( uid, user ) => db
	.child( 'users' )
	.child( uid )
	.update( user );
