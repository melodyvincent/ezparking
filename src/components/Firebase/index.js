import firebase from "firebase/app";
import "firebase/storage";

var config = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "blacktop-6a536.firebaseapp.com",
  databaseURL: "https://blacktop-6a536.firebaseio.com",
  projectId: "blacktop-6a536",
  storageBucket: "blacktop-6a536.appspot.com",
  messagingSenderId: "1047355744927"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as default };
