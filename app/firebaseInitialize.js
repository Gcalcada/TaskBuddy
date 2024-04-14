
import { initializeApp } from '@firebase/app';
import { getReactNativePersistence, initializeAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyBYZnHhoHSFIsCPsTG6ZWYNjSgUy1ma5xA',
    authDomain: 'todobuddylist.firebaseapp.com',
    databaseURL: 'https://todobuddylist.firebaseio.com',
    projectId: 'todobuddylist',
    storageBucket: 'gs://todobuddylist.appspot.com',
    messagingSenderId: '13451639881',
    appId: '1:13451639881:web:d3b2f32eac887832d3d398',
    measurementId: 'G-13451639881',
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

