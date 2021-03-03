import firebase from 'firebase/app';

//Just run the code that is in global scope
//without importing anything
import 'firebase/auth'; 
import 'firebase/storage';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_FIREBASE_APP_ID 
});

const auth = app.auth();
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default app;
export { projectStorage, projectFirestore, timestamp , auth};