import Link from 'next/link';
import { ChatIcon, HouseIcon } from '@/components/Icons';
import { SITE } from '@/lib/site';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand">
          {/* مكان الشعار — يتبدل بملف الشعار لاحقاً */}
          <span className="brand__logo" aria-hidden="true">
            <HouseIcon />
          </span>
          <span className="brand__text">
            <span className="brand__name">{SITE.name}</span>
            <span className="brand__tagline">{SITE.tagline}</span>
          </span>
        </Link>
        <button type="button" className="btn btn--wa btn--icon" aria-label="تواصل معي عبر واتساب">
          <ChatIcon />
        </button>
      </div>
    </header>
  );
}
