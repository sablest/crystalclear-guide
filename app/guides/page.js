// Импортируем наш "телефон"
import db from '../../lib/firebase'; // Убедись, что путь правильный

// Эта функция будет запущена на сервере (Vercel)
async function getGuides() {
  try {
    const guidesRef = db.collection('guides');
    const snapshot = await guidesRef.get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return [];
    }

    const guides = [];
    snapshot.forEach((doc) => {
      guides.push({ id: doc.id, ...doc.data() });
    });

    return guides;
  } catch (error) {
    console.error("Ошибка при получении данных из Firestore:", error);
    // Возвращаем пустой массив, чтобы страница не "сломалась"
    return []; 
  }
}

export default async function GuidesPage() {
  const guides = await getGuides();

  return (
    <div>
      <h1>Наши Гайды</h1>
      {guides.length > 0 ? (
        <ul>
          {guides.map((guide) => (
            <li key={guide.id}>
              {guide.title} (Slug: {guide.slug})
            </li>
          ))}
        </ul>
      ) : (
        <p>Гайдов пока нет (или не удалось загрузить).</p>
      )}
    </div>
  );
}

// Говорим Next.js не кэшировать эту страницу, чтобы мы видели изменения
export const dynamic = 'force-dynamic';