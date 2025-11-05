import { db } from '../../lib/firebase'; 
import Link from 'next/link'; // <--- 1. ИМПОРТИРУЕМ LINK

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
            // --- 2. ВОТ ИЗМЕНЕНИЯ ---
            // Оборачиваем `li` в `Link`, который ведет на /guides/ИМЯ-СЛАГА
            <Link key={guide.id} href={`/guides/${guide.slug}`}>
              <li>
                {guide.title} (Slug: {guide.slug})
              </li>
            </Link>
            // --- КОНЕЦ ИЗМЕНЕНИЙ ---
          ))}
        </ul>
      ) : (
        <p>Гайдов пока нет (или не удалось загрузить).</p>
      )}
    </div>
  );
}

export const dynamic = 'force-dynamic';