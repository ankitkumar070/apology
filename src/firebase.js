import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAU_jYQK3FC8RSfkB5e_32SbykS20tB9dw",
  authDomain: "interactive-apology-website.firebaseapp.com",
  projectId: "interactive-apology-website",
  storageBucket: "interactive-apology-website.firebasestorage.app",
  messagingSenderId: "162476203305",
  appId: "1:162476203305:web:6618280dedf766017a2b38",
  measurementId: "G-YF0FVGZNMK"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);