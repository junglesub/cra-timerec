import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDudBeNmd2uLbRPF1VWzqwIxxi-JTTc4cc",
  authDomain: "cra-timerec-1229.firebaseapp.com",
  databaseURL: "https://cra-timerec-1229-default-rtdb.firebaseio.com",
  projectId: "cra-timerec-1229",
  storageBucket: "cra-timerec-1229.appspot.com",
  messagingSenderId: "5546557660",
  appId: "1:5546557660:web:ceabcedb06b288053a3419",
});
