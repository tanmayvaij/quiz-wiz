import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq4UTI7GVKYa-KWAYGrfP93I-Dx0S4X6A",
  authDomain: "educationalquiz-c87d4.firebaseapp.com",
  databaseURL: "https://educationalquiz-c87d4-default-rtdb.firebaseio.com",
  projectId: "educationalquiz-c87d4",
  storageBucket: "educationalquiz-c87d4.appspot.com",
  messagingSenderId: "1079673630831",
  appId: "1:1079673630831:web:ec99f87165e053a1d4dd9a",
  measurementId: "G-K56GNBDXYY"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
