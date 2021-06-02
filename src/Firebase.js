import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyDp1Dc8KhFh-q3Zzn6M9naEjw4ainbGAuk",
    authDomain: "fbchat-b89e9.firebaseapp.com",
    projectId: "fbchat-b89e9",
    storageBucket: "fbchat-b89e9.appspot.com",
    messagingSenderId: "204293050250",
    appId: "1:204293050250:web:2a4a1fa1a38879375d8273",
  })
  .auth();
