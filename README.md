# WabTech - Learning Platform (Prototype)

This is a frontend-first prototype for WabTech — an AI-assisted deployment learning platform built using Firebase (Auth, Firestore, Storage) and a mock AI assistant for free local testing.

## Features
- Firebase authentication (email/password)
- Firestore: store enrolled courses, lesson progress, quiz results, certificates
- Mock AI Tutor (20 common deployment Q&A)
- Lesson-level quizzes and scoring
- Certificate generation (jsPDF) and upload to Firebase Storage
- Dashboard with courses and certificates

## Quick start
1. Clone repo
2. Replace `firebaseConfig.js` with your Firebase web config
3. Serve files locally (e.g. VSCode Live Server) or deploy to Firebase Hosting later
4. Create `courses` collection and lessons/quiz documents in Firestore (optional; app works with sample course)

## Notes
- Mock AI is used so you don't need external AI keys or paid plans.
- For production, move AI calls to server-side and protect API keys.
- view my mini learning https://wabtec.netlify.app/
