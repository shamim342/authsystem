import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";

const firebaseInitialize=() => {
    initializeApp(firebaseConfig);
}

export default firebaseInitialize;