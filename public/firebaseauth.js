import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCs9qnRtRORPahcf4b46MqVkB-y_qCLNbo",
  authDomain: "login-form-80cf8.firebaseapp.com",
  projectId: "login-form-80cf8",
  storageBucket: "login-form-80cf8.firebasestorage.app",
  messagingSenderId: "395275341969",
  appId: "1:395275341969:web:2ac1e87e6ec130b434af30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized");

const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user);
    

    const userData = {
      email,
      firstName,
      lastName,
    };

    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, userData);
    alert('Account created and data saved!');
     window.location.href = "index.html"; // only redirect if needed

  } catch (error) {
    console.error('Error:', error.code, error.message);
  }
});


document.getElementById('signinForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('loggedInUser',user.uid);
        alert('logged in successfully!');
        window.location.href = 'homepage.html';
      })
      .catch((error) => console.log(error))
  });