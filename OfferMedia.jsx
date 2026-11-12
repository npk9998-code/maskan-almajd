import { TYPE_ICON } from '@/components/Icons';
import { offerTitle } from '@/lib/format';
import { SITE } from '@/lib/site';

// الغلاف الأخضر للعرض اللي ما فيه صور
export function OfferCover({ offer, size = 'card' }) {
  const Icon = TYPE_ICON[offer.type];
  return (
    <div className={`cover cover--${size}`}>
      <Icon className="cover__icon" strokeWidth={1.5} />
      <span className="cover__label">{offerTitle(offer)}</span>
    </div>
  );
}

export function NumberBadge({ id }) {
  return <span className="chip chip--number">رقم {id}</span>;
}

export function StatusBadge({ offer, isNew }) {
  if (offer.status === 'sold') return <span className="chip chip--sold">تم البيع</span>;
  if (isNew) return <span className="chip chip--new">جديد</span>;
  return null;
}

export function Watermark({ onCover }) {
  return (
    <span className={onCover ? 'watermark watermark--cover' : 'watermark'}>{SITE.shortName}</span>
  );
}
