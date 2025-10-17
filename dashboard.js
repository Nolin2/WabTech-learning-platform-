// dashboard.js
import { app } from "./firebaseConfig.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, collection, doc, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

const userNameEl = document.getElementById('user-name');
const courseListEl = document.getElementById('course-list');
const certListEl = document.getElementById('cert-list');
const logoutBtn = document.getElementById('logoutBtn');

onAuthStateChanged(auth, async (user)=>{
  if (!user) {
    window.location.href = 'login.html';
    return;
  }
  userNameEl.innerText = user.displayName || user.email;
  await loadEnrolledCourses(user.uid);
  await loadCertificates(user.uid);
});

logoutBtn.addEventListener('click', async ()=>{
  await signOut(auth);
  window.location.href = 'login.html';
});

async function loadEnrolledCourses(uid) {
  courseListEl.innerHTML = '<p>Loading courses...</p>';
  const enrolledRef = collection(db, `users/${uid}/enrolledCourses`);
  const snap = await getDocs(enrolledRef);
  courseListEl.innerHTML = '';
  if (snap.empty) {
    courseListEl.innerHTML = '<p>No enrolled courses yet. Visit Home to enroll.</p>';
    return;
  }
  snap.forEach(docSnap=>{
    const data = docSnap.data();
    const div = document.createElement('div');
    div.style.background='#fff'; div.style.padding='12px'; div.style.borderRadius='8px'; div.style.marginBottom='12px';
    div.innerHTML = `<strong>${data.title || docSnap.id}</strong>
      <div style="margin-top:8px">
        <div style="background:#e5e7eb;border-radius:8px;height:10px;overflow:hidden">
          <div style="background:#22c55e;height:100%;width:${data.progress||0}%"></div>
        </div>
        <small>${data.progress||0}% complete</small>
      </div>
      <div style="margin-top:8px"><button class="btn" data-course="${docSnap.id}">Continue Course</button></div>`;
    courseListEl.appendChild(div);
    div.querySelector('button').addEventListener('click', ()=> {
      // go to Home and open course
      window.location.href = 'index.html';
      // We rely on index page 'openCourse' function reading courses from Firestore or sample
    });
  });
}

async function loadCertificates(uid) {
  certListEl.innerHTML = '<li>Loading...</li>';
  const certRef = collection(db, `users/${uid}/certificates`);
  const snap = await getDocs(certRef);
  certListEl.innerHTML = '';
  if (snap.empty) {
    certListEl.innerHTML = '<li>No certificates yet</li>';
    return;
  }
  snap.forEach(docSnap=>{
    const d = docSnap.data();
    const li = document.createElement('li');
    li.innerHTML = `<a href="${d.url}" target="_blank">${d.course}</a> — ${new Date(d.date).toLocaleDateString()}`;
    certListEl.appendChild(li);
  });
}

// tools
document.getElementById('openAi').addEventListener('click', ()=> window.location.href = 'aiTutor.html');
document.getElementById('openNotes').addEventListener('click', ()=> window.location.href = 'notes.html');
