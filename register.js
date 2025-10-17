// register.js
import { app } from "./firebaseConfig.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('registerBtn').addEventListener('click', async ()=>{
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const msg = document.getElementById('message');
  msg.innerText = '';

  if (!name || !email || !password) { msg.innerText = 'Please fill all fields'; return; }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCred.user, { displayName: name });
    // create minimal user doc
    await setDoc(doc(db, 'users', userCred.user.uid), { name, email, createdAt: new Date().toISOString() });
    window.location.href = 'dashboard.html';
  } catch(e) {
    msg.innerText = e.message;
  }
});
