// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";

// مفاتيح الربط الخاصة بمشروعك (Friends Clinic)
const firebaseConfig = {
  apiKey: "AIzaSyDJ2PMemkLDrVWS2PMH9z7glG-yK0QDNsg",
  authDomain: "friends-clinic.firebaseapp.com",
  projectId: "friends-clinic",
  storageBucket: "friends-clinic.firebasestorage.app",
  messagingSenderId: "741063199735",
  appId: "1:741063199735:web:d191a36a4c1900a38bbcf2",
  measurementId: "G-CKMCE2QRHG"
};

// تهيئة (Initialize) خدمات فايربيز
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); 

// تصدير المتغيرات عشان باقي ملفات النظام تستخدمها
export { app, db, storage };
