// login.js
import { app } from "./firebaseConfig.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const auth = getAuth(app);
const loginBtn = document.getElementById('loginBtn');
const msg = document.getElementById('message');

loginBtn.addEventListener('click', async ()=>{
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  if (!email || !password) { msg.innerText = 'Enter email and password'; return; }
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'dashboard.html';
  } catch(e) {
    msg.innerText = e.message;
  }
});

onAuthStateChanged(auth, user=>{
  if (user) {
    // if already logged, redirect
    window.location.href = 'dashboard.html';
  }
});
