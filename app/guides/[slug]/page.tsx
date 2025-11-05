import { db } from '../../../lib/firebase';
import React from 'react'; 

async function getGuideBySlug(slug: string | undefined) { 
  if (!slug) {
    console.log("getGuideBySlug был вызван без slug. Пропускаем.");
    return null;
  }

  try {
    const guidesRef = db.collection('guides');
    const snapshot = await guidesRef.where('slug', '==', slug).limit(1).get();

    if (snapshot.empty) {
      console.log('No matching document for slug:', slug);
      return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };

  } catch (error) {
    // --- ВОТ ИСПРАВЛЕНИЕ ---
    if (error instanceof Error) {
      console.error(`Ошибка при получении гайда по slug: ${slug}`, error.stack);
    } else {
      console.error(`Ошибка при получении гайда по slug: ${slug}`, error);
    }
    // --- КОНЕЦ ИСПРАВЛЕНИЯ ---
    return null;
  }
}

export default async function GuideDetailPage({ params }: { params: { slug: string } }) { 
  const guide: any = await getGuideBySlug(params.slug); 

  return (
    <div>
      {guide ? (
        <>
          <h1>{guide.title}</h1>
          <p>Это страница для гайда с ID: {guide.id}</p>
          <p>И Slug: {guide.slug}</p>
        </>
      ) : (
        <h1>Гайд не найден</h1>
      )}
    </div>
  );
}

export const dynamic = 'force-dynamic';