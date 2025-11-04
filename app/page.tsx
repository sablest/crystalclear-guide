import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Добро пожаловать на Crystal Clear</h1>
      <p>Это главная страница.</p>
      <Link href="/guides">
        <button>Перейти к Списку Гайдов</button>
      </Link>
    </div>
  );
}