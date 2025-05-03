import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCs9qnRtRORPahcf4b46MqVkB-y_qCLNbo",
  authDomain: "login-form-80cf8.firebaseapp.com",
  projectId: "login-form-80cf8",
  storageBucket: "login-form-80cf8.firebasestorage.app",
  messagingSenderId: "395275341969",
  appId: "1:395275341969:web:2ac1e87e6ec130b434af30"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem("loggedInUser");
  const docRef = doc(db, "users", loggedInUserId);
  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        document.getElementById("loggeduserfname").innerHTML =
          userData.firstName;
        document.getElementById("loggeduserlname").innerHTML =
          userData.lastName;
        document.getElementById("loggeduseremail").innerHTML = userData.email;
      }
    })

    .catch((error) => console.log(error));
});

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    signOut(auth)
    .then(() => {
        alert('signed out successfully');
        window.location.href = "index.html";
    })
    .catch((error) => console.log('error signing out',error));
})