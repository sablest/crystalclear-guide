import { db } from '../../../lib/firebase';

async function getGuideBySlug(slug) {
  // --- 1. ДОБАВЛЯЕМ ПРОВЕРКУ ---
  // Если slug по какой-то причине "undefined", сразу выходим.
  if (!slug) {
    console.log("getGuideBySlug был вызван без slug. Пропускаем.");
    return null;
  }
  // --- КОНЕЦ ПРОВЕРКИ ---

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
    // --- 2. УЛУЧШАЕМ ЛОГ ОБ ОШИБКЕ ---
    // Теперь, если будет ошибка, мы увидим, с каким slug она произошла
    console.error(`Ошибка при получении гайда по slug: ${slug}`, error);
    return null;
  }
}

export default async function GuideDetailPage({ params }) {
  // Теперь, даже если params.slug придет как 'undefined',
  // наша функция getGuideBySlug() с этим справится.
  const guide = await getGuideBySlug(params.slug);

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