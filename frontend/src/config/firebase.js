import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_CONFIG_APP_ID
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
