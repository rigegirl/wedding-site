import { weddingData } from '../data/weddingData';
import { MapPin, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="welcome"
      className="relative min-h-[70vh] pt-20 lg:min-h-[85vh] flex items-center justify-center overflow-hidden"
      style={{ scrollMarginTop: '100px' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-brand-black">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80"
          alt="Wedding couple"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-20">
        <p className="font-serif italic text-brand-cream/90 text-xl sm:text-2xl lg:text-3xl mb-6 leading-relaxed">
          We joyfully invite you to our wedding
        </p>

        <h1 className="font-script text-brand-cream text-5xl sm:text-6xl lg:text-8xl mb-8">
          {weddingData.couple.partner1} & {weddingData.couple.partner2}
        </h1>

        <div className="flex items-center justify-center gap-2 text-brand-cream/80 mb-4">
          <MapPin size={16} />
          <span className="text-[11px] font-medium tracking-[0.25em] uppercase">
            {weddingData.location}
          </span>
        </div>

        <p className="text-[11px] tracking-[0.3em] text-white font-medium">
          {weddingData.couple.hashtag}
        </p>

        <div className="mt-16 animate-bounce">
          <span className="text-brand-cream/50 text-[10px] tracking-[0.3em] uppercase block mb-2">
            SCROLL
          </span>
          <ChevronDown size={20} className="mx-auto text-brand-cream/50" />
        </div>
      </div>
    </section>
  );
}
