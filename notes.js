// notes.js
import { app } from "./firebaseConfig.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);
const notesList = document.getElementById('notesList');

onAuthStateChanged(auth, async (user)=>{
  if (!user) {
    notesList.innerHTML = '<p>Please login to see notes</p>';
    return;
  }
  notesList.innerHTML = '<p>Loading notes...</p>';
  try {
    const snap = await getDocs(collection(db, `users/${user.uid}/aiChats`));
    notesList.innerHTML = '';
    if (snap.empty) {
      notesList.innerHTML = '<p>No AI notes yet. Use the AI Tutor to create notes.</p>';
      return;
    }
    snap.forEach(doc=>{
      const d = doc.data();
      const div = document.createElement('div');
      div.style.padding='8px'; div.style.borderBottom='1px solid #f1f5f9';
      div.innerHTML = `<p style="margin:0"><strong>Q:</strong> ${d.question}</p>
                       <p style="margin:6px 0 0"><strong>A:</strong> ${d.answer}</p>
                       <small style="color:#6b7280">${new Date(d.createdAt).toLocaleString()}</small>`;
      notesList.appendChild(div);
    });
  } catch(e) {
    notesList.innerHTML = '<p>Error loading notes</p>';
    console.error(e);
  }
});
