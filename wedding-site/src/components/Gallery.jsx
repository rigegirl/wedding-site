import { useState } from 'react';
import { weddingData } from '../data/weddingData';
import Lightbox from './Lightbox';

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  return (
    <section id="gallery" className="py-24 lg:py-36 px-6" style={{ scrollMarginTop: '100px' }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-brand-gold uppercase mb-4">
            MEMORIES IN THE MAKING
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-espresso mb-4">
            Moments of Us
          </h2>
          <p className="font-serif italic text-brand-gray text-lg">
            A glimpse into our love and laughter
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {weddingData.gallery.map((src, i) => (
            <div
              key={i}
              onClick={() => {
                setLightboxIndex(i);
                setLightboxOpen(true);
              }}
              className="relative rounded-2xl overflow-hidden cursor-pointer group h-[380px] lg:h-[450px] shadow-[0_8px_24px_rgba(20,17,12,0.08)]"
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={weddingData.gallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onChangeIndex={setLightboxIndex}
        />
      )}
    </section>
  );
}
