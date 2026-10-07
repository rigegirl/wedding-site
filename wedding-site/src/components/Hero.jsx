import { useEffect, useState } from 'react';
import { weddingData } from '../data/weddingData';
import { MapPin, ChevronDown } from 'lucide-react';

import hero1 from '../assets/hero1.png';
import hero2 from '../assets/hero2.png';
import hero3 from '../assets/hero3.png';

const heroImages = [hero1, hero2, hero3];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="welcome"
      className="relative min-h-[70vh] pt-20 lg:min-h-[85vh] flex items-center justify-center overflow-hidden"
      style={{ scrollMarginTop: '100px' }}
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 bg-brand-black">
        {heroImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt="Wedding couple"
           className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
  currentImage === index ? 'opacity-40' : 'opacity-0'
}`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-20">
        <p className="font-serif italic text-[#F9F9F1]/90 text-xl sm:text-2xl lg:text-3xl mb-6 leading-relaxed">
          We joyfully invite you to our wedding
        </p>

        <h1
          className="font-script text-5xl sm:text-6xl lg:text-8xl mb-8"
          style={{ color: '#F9F9F1' }}
        >
          {weddingData.couple.partner1} & {weddingData.couple.partner2}
        </h1>

        <div className="flex items-center justify-center gap-2 text-[#F9F9F1]/80 mb-4">
          <MapPin size={16} />
          <span className="text-[11px] font-medium tracking-[0.25em] uppercase">
            {weddingData.location}
          </span>
        </div>

        <p className="text-[11px] tracking-[0.3em] text-white font-medium">
          {weddingData.couple.hashtag}
        </p>

        <div className="mt-16 animate-bounce">
          <span className="text-[#F9F9F1]/50 text-[10px] tracking-[0.3em] uppercase block mb-2">
            SCROLL
          </span>
          <ChevronDown size={20} className="mx-auto text-[#F9F9F1]/50" />
        </div>
      </div>
    </section>
  );
}