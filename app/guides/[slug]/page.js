import { db } from '../../../lib/firebase'; // Идем на 3 уровня вверх, чтобы найти lib

// Эта функция найдет гайд по его 'slug'
async function getGuideBySlug(slug) {
  try {
    const guidesRef = db.collection('guides');
    // Создаем запрос: "найди в 'guides' документ, где поле 'slug' равно нашему slug"
    const snapshot = await guidesRef.where('slug', '==', slug).limit(1).get();

    if (snapshot.empty) {
      console.log('No matching document for slug:', slug);
      return null;
    }

    // Так как slug уникальный, мы берем первый (и единственный) результат
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };

  } catch (error) {
    console.error("Ошибка при получении гайда по slug:", error);
    return null;
  }
}

// `params` - это то, что Next.js берет из URL (наш `[slug]`)
export default async function GuideDetailPage({ params }) {
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

// Говорим Next.js не кэшировать
export const dynamic = 'force-dynamic';