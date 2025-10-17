// aiTutor.js
import { app } from "./firebaseConfig.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

const chatLog = document.getElementById('chatLog');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

const kb = [
  { keywords: ["heroku","deploy"], answer: "Heroku: `git push heroku main` or connect GitHub and enable Auto-deploy. Make sure Procfile exists when needed."},
  { keywords: ["firebase","hosting","deploy"], answer: "Firebase Hosting: `firebase init hosting` then `firebase deploy`. You need the Firebase CLI and project selected."},
  { keywords: ["docker","dockerfile"], answer: "Docker: create Dockerfile, `docker build` and `docker run` or push to registry and deploy to cloud."},
  { keywords: ["ci","cd","github actions"], answer: "Use GitHub Actions to run tests and `firebase deploy` on push. Store secrets in Actions settings."},
  { keywords: ["ssl","https"], answer: "Most hosting providers auto-provide SSL; ensure your DNS is correct and TLS will be enabled."},
  { keywords: ["aws"], answer: "AWS has many services: Amplify (frontend), Elastic Beanstalk, EC2. Amplify is simplest for static + serverless."},
  { keywords: ["vercel"], answer: "Vercel auto-deploys projects and supports serverless functions for Next.js."},
  { keywords: ["env variables","config"], answer: "Set env vars in your host's dashboard (Heroku Config Vars, Vercel Environment Variables)."},
  { keywords: ["logs"], answer: "Use provider logs (Heroku logs, Firebase console logs) to debug runtime errors."},
  { keywords: ["npm build"], answer: "Ensure `npm run build` succeeds locally before deploying; missing dependencies cause build failures."},
  // additional entries to make up 20-like coverage
  { keywords: ["pipeline","failed"], answer: "Failed pipeline: check build output and environment variables; run locally to reproduce."},
  { keywords: ["rollback"], answer: "Rollback on Heroku: use release commands; on other platforms there are similar release management tools."},
  { keywords: ["certificate"], answer: "Certificates: use provider's tooling; Cloud providers typically manage TLS for hosted apps."},
  { keywords: ["domain","custom domain"], answer: "Add DNS records (A/CNAME) per host instructions; verify ownership in hosting console."},
  { keywords: ["node version"], answer: "Specify Node engine in package.json under `engines` for platform runtimes."}
];

function findAnswer(text) {
  const q = text.toLowerCase();
  for (const item of kb) {
    if (item.keywords.some(k => q.includes(k))) return item.answer;
  }
  return "I don't know that yet. Try 'Heroku deploy' or 'Firebase deploy' queries, or check the course lessons.";
}

sendBtn.addEventListener('click', async ()=>{
  const text = chatInput.value.trim();
  if (!text) return;
  chatLog.innerHTML += `<div style="margin-bottom:8px"><b>You:</b> ${text}</div>`;
  const answer = findAnswer(text);
  chatLog.innerHTML += `<div style="margin-bottom:10px"><b>WabTech AI:</b> ${answer}</div>`;
  chatLog.scrollTop = chatLog.scrollHeight;
  chatInput.value = '';

  // save chat in Firestore for this user if logged in
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        await addDoc(collection(db, `users/${user.uid}/aiChats`), {
          question: text,
          answer,
          createdAt: new Date().toISOString()
        });
      } catch(e) { console.error(e); }
    }
  });
});
