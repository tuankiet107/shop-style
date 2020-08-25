import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDOHYpIbUPFgyAlI42yZk99NE8hxSvUn30",
    authDomain: "shop-style-10799.firebaseapp.com",
    databaseURL: "https://shop-style-10799.firebaseio.com",
    projectId: "shop-style-10799",
    storageBucket: "shop-style-10799.appspot.com",
    messagingSenderId: "321672176576",
    appId: "1:321672176576:web:134010f50b28065d6a9e25",
    measurementId: "G-FXVZZ2KQBZ"
}
firebase.initializeApp(config)

export default firebase;