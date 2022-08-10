// Import functions need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

// Web app's Firebase configuration:
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: 'generative-art-app.firebaseapp.com',
	projectId: 'generative-art-app',
	storageBucket: 'generative-art-app.appspot.com',
	messagingSenderId: '421228799570',
	appId: '1:421228799570:web:996cd94c4768d3be10a18b',
	measurementId: 'G-5EBND1HV4H',
};

// Initialize Firebase:
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
