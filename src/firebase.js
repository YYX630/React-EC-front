import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHacZKnrlS1oKbs55uCCITyheMg6EUkEc",
  authDomain: "ecommerce-ea112.firebaseapp.com",
  projectId: "ecommerce-ea112",
  storageBucket: "ecommerce-ea112.appspot.com",
  messagingSenderId: "1076144539433",
  appId: "1:1076144539433:web:47bd283e00f579e44b5938",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

// export defaultの代わりに...
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
