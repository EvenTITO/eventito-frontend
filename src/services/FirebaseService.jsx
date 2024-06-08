import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJdOMRxl7_IENGO8LB1lp3moUpPeAVaME",
  authDomain: "eventito-c15b3.firebaseapp.com",
  projectId: "eventito-c15b3",
  storageBucket: "eventito-c15b3.appspot.com",
  messagingSenderId: "759596783571",
  appId: "1:759596783571:web:c2d508f95095c568698126"
};

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {
  app,
  auth
};
