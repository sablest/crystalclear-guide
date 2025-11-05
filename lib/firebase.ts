import admin from 'firebase-admin';

const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!serviceAccountEnv) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT не установлен в Vercel!');
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(serviceAccountEnv)
      ),
    });
  } catch (error) {
    // --- ВОТ ИСПРАВЛЕНИЕ ---
    // Мы проверяем, что error - это действительно объект Error
    if (error instanceof Error) {
      console.error('Firebase admin initialization error', error.stack);
    } else {
      console.error('Firebase admin initialization error', error);
    }
    // --- КОНЕЦ ИСПРАВЛЕНИЯ ---
  }
}

const db = admin.firestore();

export { db };