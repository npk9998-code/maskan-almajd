import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="container page empty">
        <h1>العرض غير موجود</h1>
        <p>يمكن انباع أو انشال. تقدر تشوف باقي العروض.</p>
        <Link href="/" className="btn btn--primary">
          كل العروض
        </Link>
      </main>
    </>
  );
}
