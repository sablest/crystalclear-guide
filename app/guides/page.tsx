import { db } from '../../lib/firebase';
import Link from 'next/link';
import React from 'react'; 

async function getGuides() {
  try {
    const guidesRef = db.collection('guides');
    const snapshot = await guidesRef.get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return [];
    }
    
    const guides: any[] = []; 
    snapshot.forEach((doc) => {
      guides.push({ id: doc.id, ...doc.data() });
    });

    return guides;
  } catch (error) {
    // --- ВОТ ИСПРАВЛЕНИЕ ---
    if (error instanceof Error) {
      console.error("Ошибка при получении данных из Firestore:", error.stack);
    } else {
      console.error("Ошибка при получении данных из Firestore:", error);
    }
    // --- КОНЕЦ ИСПРАВЛЕНИЯ ---
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
          {guides.map((guide: any) => (
            <Link key={guide.id} href={`/guides/${guide.slug}`}>
              <li>
                {guide.title} (Slug: {guide.slug})
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>Гайдов пока нет (или не удалось загрузить).</p>
      )}
    </div>
  );
}

export const dynamic = 'force-dynamic';