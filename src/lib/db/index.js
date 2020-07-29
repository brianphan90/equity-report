import firebase from '@/lib/db/conf';

const { auth } = firebase;

const db         = firebase.database().ref( '/' );
const FirebaseId = () => db.push().key;

export {
	firebase,
	db,
	auth,
	FirebaseId
};
