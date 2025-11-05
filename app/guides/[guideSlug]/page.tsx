import { db } from '../../../lib/firebase';
import React from 'react'; 

// Функция не меняется, она все еще принимает просто "строку"
async function getGuideBySlug(slug: string | undefined) { 
  if (!slug) {
    console.log("getGuideBySlug был вызван без slug. Пропускаем.");
    return null;
  }

  try {
    // В Firestore мы все еще ищем поле с именем 'slug'
    const guidesRef = db.collection('guides');
    const snapshot = await guidesRef.where('slug', '==', slug).limit(1).get();

    if (snapshot.empty) {
      console.log('No matching document for slug:', slug);
      return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };

  } catch (error) {
    if (error instanceof Error) {
      console.error(`Ошибка при получении гайда по slug: ${slug}`, error.stack);
    } else {
      console.error(`Ошибка при получении гайда по slug: ${slug}`, error);
    }
    return null;
  }
}

// --- ВОТ ГЛАВНЫЕ ИЗМЕНЕНИЯ ---
// 1. Мы говорим TypeScript, что ждем 'guideSlug'
export default async function GuideDetailPage({ params }: { params: { guideSlug: string } }) { 
  
  // 2. Мы логируем 'guideSlug'
  console.log('GuideDetailPage рендерится. Полученные params.guideSlug:', params.guideSlug);

  // 3. Мы передаем params.guideSlug (а не params.slug) в нашу функцию
  const guide: any = await getGuideBySlug(params.guideSlug); 

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