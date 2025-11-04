import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      ),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

// --- Вот изменения ---
// 1. Создаем переменную для базы данных
const db = admin.firestore();

// 2. Экспортируем ее по имени { db }, а не "по умолчанию"
export { db };