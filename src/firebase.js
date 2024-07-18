import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFFr6xiKV-l6pcR8G85sJZMOrZnaSZ_yA",
  authDomain: "auth-jwt-80256.firebaseapp.com",
  databaseURL:
    "https://auth-jwt-80256-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "auth-jwt-80256",
  storageBucket: "auth-jwt-80256.appspot.com",
  messagingSenderId: "114539662508",
  appId: "G-NSB2RF3V38",
  measurementId: "6422524416:AAGQr48veM9k-JSGCBKDjCh6ZHCfGHdaBWI",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };
