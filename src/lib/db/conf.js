import firebase from 'firebase';

import env from '@/assets/js/env';

const {
	FIREBASE_API_KEY             : apiKey,
	FIREBASE_AUTH_DOMAIN         : authDomain,
	FIREBASE_DATABASE_URL        : databaseURL,
	FIREBASE_PROJECT_ID          : projectId,
	FIREBASE_STORAGE_BUCKET      : storageBucket,
	FIREBASE_MESSAGING_SENDER_ID : messagingSenderId,
	FIREBASE_APP_ID              : appId,
	FIREBASE_MEASUREMENT_ID      : measurementId,
} = env;

const firebaseConfig = {
	apiKey,
	authDomain,
	databaseURL,
	projectId,
	storageBucket,
	messagingSenderId,
	appId,
	measurementId,
};

// Initialize Firebase
firebase.initializeApp( firebaseConfig );

export default firebase;
