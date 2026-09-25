import { useState } from 'react';
import { weddingData } from '../data/weddingData';
import { Maximize2 } from 'lucide-react';
import Lightbox from './Lightbox';

export default function Colours() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const inspirationImages = weddingData.styleInspiration.map((s) => s.image);

  return (
    <section id="colours" className="py-24 lg:py-36 px-6" style={{ scrollMarginTop: '100px' }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-brand-gold uppercase mb-4">
            THE DRESS CODE
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-espresso mb-6">
            Colours of the Day
          </h2>
          <p className="text-brand-gray text-sm leading-relaxed max-w-xl mx-auto">
            We invite our guests to express themselves in beautiful{' '}
            <strong>traditional</strong>, <strong>contemporary</strong>,{' '}
            <strong>red carpet</strong>, or <strong>modern chic</strong> styles in shades of
            Vintage Wine and Forest Green with champagne gold accents.
          </p>
        </div>

        {/* Colour panels */}
        <div className="space-y-8 mb-24">
          {weddingData.colours.map((colour) => (
            <div
              key={colour.name}
              className="relative rounded-3xl overflow-hidden h-[400px] lg:h-[600px] flex items-center justify-center shadow-[0_15px_40px_rgba(20,17,12,0.1)]"
              style={{ background: colour.fallbackGradient }}
            >
              <h3 className="font-serif text-5xl lg:text-7xl text-white relative z-10">
                {colour.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Style Inspiration */}
        <div className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-brand-gold uppercase mb-4">
            STYLE INSPIRATION
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-espresso mb-4">
            Style Inspiration
          </h2>
          <p className="font-serif italic text-brand-gray text-lg">
            Examples of gorgeous traditional and contemporary looks we love
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {weddingData.styleInspiration.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-[0_15px_40px_rgba(20,17,12,0.06)] group"
            >
              <div
                className="relative h-[350px] lg:h-[420px] overflow-hidden cursor-pointer"
                onClick={() => {
                  setLightboxIndex(i);
                  setLightboxOpen(true);
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[11px] tracking-[0.2em] font-semibold">
                    CLICK TO VIEW
                  </span>
                </div>
                <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={14} className="text-brand-espresso" />
                </button>
              </div>
              <div className="p-8">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-brand-gold uppercase mb-2">
                  {item.category}
                </p>
                <h3 className="font-serif text-2xl text-brand-espresso mb-2">{item.title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={inspirationImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onChangeIndex={setLightboxIndex}
        />
      )}
    </section>
  );
}
