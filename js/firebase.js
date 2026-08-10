
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, set, update, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBCh5eqP5A6c0K_-KtlwNAPR_vYFXYHxm4",
  authDomain: "space-4e22f.firebaseapp.com",
  projectId: "space-4e22f",
  storageBucket: "space-4e22f.firebasestorage.app",
  messagingSenderId: "804457119217",
  appId: "1:804457119217:web:99a62f5ef4ebfed8afd850",
  measurementId: "G-R2YRH0EX9L"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { ref, onValue, set, update, push };
