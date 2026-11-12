import Link from 'next/link';
import { AreaIcon, BathIcon, BedIcon, ChatIcon, CompassIcon, PinIcon, RoadIcon } from '@/components/Icons';
import { NumberBadge, OfferCover, StatusBadge, Watermark } from '@/components/OfferMedia';
import { areaText, bathsText, offerLocation, offerTitle, priceInfo, roomsText } from '@/lib/format';

function CardSpecs({ offer }) {
  const items =
    offer.type === 'land'
      ? [
          { Icon: AreaIcon, text: areaText(offer.area) },
          { Icon: RoadIcon, text: `شارع ${offer.streetWidth} م` },
          { Icon: CompassIcon, text: offer.facade },
        ]
      : [
          { Icon: AreaIcon, text: areaText(offer.area) },
          { Icon: BedIcon, text: roomsText(offer.rooms) },
          { Icon: BathIcon, text: bathsText(offer.bathrooms) },
        ];
  return (
    <ul className="card__specs">
      {items.map(({ Icon, text }) => (
        <li key={text}>
          <Icon className="icon-sm" />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

export default function OfferCard({ offer, priority = false }) {
  const href = `/offers/${offer.id}`;
  const price = priceInfo(offer);
  const hasImage = offer.images.length > 0;
  const title = offerTitle(offer);

  return (
    <article className={offer.status === 'sold' ? 'card card--sold' : 'card'}>
      <Link href={href} className="card__media" tabIndex={-1} aria-hidden="true">
        {hasImage ? (
          <img
            src={offer.images[0]}
            alt=""
            width={640}
            height={400}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
          />
        ) : (
          <OfferCover offer={offer} />
        )}
        <span className="media__top">
          <StatusBadge offer={offer} isNew={offer.isNew} />
          <NumberBadge id={offer.id} />
        </span>
        <Watermark onCover={!hasImage} />
      </Link>

      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__location">
          <PinIcon className="icon-sm" />
          <span>{offerLocation(offer)}</span>
        </p>
        <CardSpecs offer={offer} />

        <div className="card__footer">
          <div className="price">
            <p className={price.hidden ? 'price__value price__value--hidden' : 'price__value'}>
              {price.text}
            </p>
            {price.note ? <p className="price__note">{price.note}</p> : null}
          </div>
          <div className="card__actions">
            <Link href={href} className="btn btn--outline" aria-label={`تفاصيل العرض رقم ${offer.id}`}>
              التفاصيل
            </Link>
            <button
              type="button"
              className="btn btn--wa btn--icon"
              aria-label={`تواصل عبر واتساب عن العرض رقم ${offer.id}`}
            >
              <ChatIcon />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
