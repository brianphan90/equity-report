import firebase from '@/lib/db/conf';

const db         = firebase.database().ref( '/' );
const FirebaseId = () => db.push().key;

export {
	firebase,
	db,
	FirebaseId,
};
