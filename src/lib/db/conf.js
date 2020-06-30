import firebase from 'firebase';

require( 'dotenv' ).config( { path : '.env' } );

console.log( process.env );

const apiKey            = process.env.VUE_APP_FIREBASE_API_KEY;
const authDomain        = process.env.VUE_APP_FIREBASE_AUTH_DOMAIN;
const databaseURL       = process.env.VUE_APP_FIREBASE_DATABASE_URL;
const projectId         = process.env.VUE_APP_FIREBASE_PROJECT_ID;
const storageBucket     = process.env.VUE_APP_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID;
const appId             = process.env.VUE_APP_FIREBASE_APP_ID;
const measurementId     = process.env.VUE_APP_FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {
	// apiKey,
	// authDomain,
	// databaseURL,
	// projectId,
	// storageBucket,
	// messagingSenderId,
	// appId,
	// measurementId,
	apiKey            : 'AIzaSyA6YXrXm3QrGT2swuuXXOsDZpj38pMbrw8',
	authDomain        : 'musd-equity-report.firebaseapp.com',
	databaseURL       : 'https://musd-equity-report.firebaseio.com',
	projectId         : 'musd-equity-report',
	storageBucket     : 'musd-equity-report.appspot.com',
	messagingSenderId : '837648574102',
	appId             : '1:837648574102:web:b50dcb2e70f554679984b7',
	measurementId     : 'G-SV1SBB28L7'
};

console.log( firebaseConfig );

// Initialize Firebase
firebase.initializeApp( firebaseConfig );

export default firebase;
