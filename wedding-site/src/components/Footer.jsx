import { weddingData } from '../data/weddingData';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const weddingDate = new Date(weddingData.date);
  const dateStr = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-black text-[#F9F9F1] py-24 lg:py-32 px-6">
      <div className="max-w-[800px] mx-auto text-center">
        {/* Monogram */}
        <div className="w-[80px] h-[80px] rounded-full border-2 border-brand-gold/40 flex items-center justify-center mx-auto mb-12">
          <span className="font-script text-[#F9F9F1] text-3xl">O&O</span>
        </div>

        <p className="font-serif text-3xl lg:text-4xl text-[#F9F9F1]/90 mb-6">
          Thank you for celebrating with us
        </p>

        <h2 className="font-script text-5xl lg:text-7xl text-brand-gold-light mb-8">
          {weddingData.couple.partner1} & {weddingData.couple.partner2}
        </h2>

        <p className="text-[11px] tracking-[0.25em] text-[#F9F9F1]/50 uppercase mb-16">
          {dateStr} &bull; {weddingData.location}
        </p>

        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full border border-brand-cream/20 flex items-center justify-center mx-auto mb-16 hover:border-brand-cream/50 hover:bg-brand-cream/5 transition-all"
          aria-label="Back to top"
        >
          <ArrowUp size={18} className="text-[#F9F9F1]/60" />
        </button>

        <div className="border-t border-white/10 pt-8">
          <p className="text-[11px] text-[#F9F9F1]/30 mb-2">
            &copy; 2026 {weddingData.couple.partner1} & {weddingData.couple.partner2}. All Rights
            Reserved.
          </p>
          <p className="text-[11px] text-[#F9F9F1]/30">
            Built by{' '}
            <a
              href="#"
              className="underline hover:text-[#F9F9F1]/60 transition-colors"
            >
              Hillcity Edgetech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
