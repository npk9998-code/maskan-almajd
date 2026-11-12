'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import OfferCard from '@/components/OfferCard';
import { ChevronDownIcon, SearchIcon } from '@/components/Icons';
import { DIRECTIONS, TYPE_FILTERS, formatNumber, normalizeArabic, resultsHeading } from '@/lib/format';

const NEAR_BUDGET_RATIO = 1.3; // مقارب لميزانيتك: لين 30% أغلى

function OfferGrid({ offers, priorityFirst }) {
  return (
    <div className="grid">
      {offers.map((offer, i) => (
        <OfferCard key={offer.id} offer={offer} priority={priorityFirst && i < 2} />
      ))}
    </div>
  );
}

export default function OffersBrowser({ offers, cities }) {
  const [query, setQuery] = useState('');
  const [direction, setDirection] = useState(null);
  const [type, setType] = useState('all');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');

  const deferredQuery = useDeferredValue(query);
  const maxPrice = budget ? Number(budget) : null;

  const { main, near } = useMemo(() => {
    const q = normalizeArabic(deferredQuery);
    const main = [];
    const near = [];
    for (const offer of offers) {
      if (direction && offer.direction !== direction) continue;
      if (type !== 'all' && offer.type !== type) continue;
      if (city && offer.city !== city) continue;
      if (q) {
        const haystack = normalizeArabic(`${offer.district} ${offer.city}`);
        if (!haystack.includes(q)) continue;
      }
      if (maxPrice && offer.price != null) {
        if (offer.price <= maxPrice) main.push(offer);
        else if (offer.price <= maxPrice * NEAR_BUDGET_RATIO) near.push(offer);
        continue;
      }
      main.push(offer); // السعر المخفي يطلع دايم
    }
    return { main, near };
  }, [offers, deferredQuery, direction, type, city, maxPrice]);

  const hasFilters = query || direction || type !== 'all' || city || budget;
  const resetFilters = () => {
    setQuery('');
    setDirection(null);
    setType('all');
    setCity('');
    setBudget('');
  };

  const onBudgetChange = (e) => {
    const digits = e.target.value.replace(/[^\d٠-٩]/g, '').replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
    setBudget(digits.slice(0, 10));
  };

  return (
    <>
      <section className="filters" aria-label="أدوات البحث">
        <label className="search">
          <SearchIcon className="search__icon" />
          <span className="sr-only">ابحث بالحي أو المدينة</span>
          <input
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث بالحي أو المدينة…"
            autoComplete="off"
            enterKeyHint="search"
            spellCheck={false}
          />
        </label>

        <fieldset className="filter-group">
          <legend>موقع الحي</legend>
          <div className="chips chips--grid">
            {DIRECTIONS.map((d) => {
              const active = direction === d.key;
              return (
                <button
                  key={d.key}
                  type="button"
                  className={active ? 'pill pill--soft is-active' : 'pill pill--soft'}
                  aria-pressed={active}
                  onClick={() => setDirection(active ? null : d.key)}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="filter-group">
          <legend>نوع العقار</legend>
          <div className="chips">
            {TYPE_FILTERS.map((t) => {
              const active = type === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  className={active ? 'pill pill--round is-active' : 'pill pill--round'}
                  aria-pressed={active}
                  onClick={() => setType(t.key)}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="filter-row">
          <label className="field field--select">
            <span className="sr-only">المدينة</span>
            <select name="city" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">المدينة</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="field__chevron" />
          </label>
          <label className="field">
            <span className="sr-only">ميزانيتك القصوى بالريال</span>
            <input
              type="text"
              inputMode="numeric"
              name="budget"
              value={budget ? formatNumber(Number(budget)) : ''}
              onChange={onBudgetChange}
              placeholder="ميزانيتك (ريال)"
              autoComplete="off"
              className="tabular"
            />
          </label>
        </div>
      </section>

      <section aria-labelledby="results-heading" className="results">
        <div className="results__head">
          <h2 id="results-heading">{resultsHeading({ direction, city })}</h2>
          <span className="results__sort">الأحدث أولاً</span>
        </div>

        <p className="sr-only" aria-live="polite">
          {main.length + near.length} عرض
        </p>

        {main.length > 0 ? (
          <OfferGrid offers={main} priorityFirst />
        ) : near.length > 0 ? (
          <p className="empty empty--inline">ما فيه عروض داخل ميزانيتك، شوف المقاربة لها تحت.</p>
        ) : (
          <div className="empty">
            <p>ما لقينا عروض تطابق بحثك.</p>
            {hasFilters ? (
              <button type="button" className="btn btn--outline" onClick={resetFilters}>
                مسح الفلاتر
              </button>
            ) : null}
          </div>
        )}

        {near.length > 0 ? (
          <>
            <div className="divider" role="separator">
              <span>مقارب لميزانيتك</span>
            </div>
            <OfferGrid offers={near} />
          </>
        ) : null}
      </section>
    </>
  );
}
