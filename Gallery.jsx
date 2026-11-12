'use client';

import { useEffect, useRef, useState } from 'react';

// معرض صور يتسحب يمين ويسار، مع نقاط تبين رقم الصورة
export default function Gallery({ images, label }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || images.length < 2) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
        }
      },
      { root: track, threshold: 0.6 },
    );
    for (const slide of track.children) observer.observe(slide);
    return () => observer.disconnect();
  }, [images.length]);

  const goTo = (i) => {
    trackRef.current?.children[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <>
      <div ref={trackRef} className="gallery__track" aria-label={label} tabIndex={0}>
        {images.map((src, i) => (
          <div key={src + i} className="gallery__slide" data-index={i}>
            <img
              src={src}
              alt={`${label} — صورة ${i + 1} من ${images.length}`}
              width={1280}
              height={960}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
            />
          </div>
        ))}
      </div>
      {images.length > 1 ? (
        <div className="gallery__dots">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              className={i === active ? 'dot is-active' : 'dot'}
              aria-label={`الصورة ${i + 1}`}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
