import { weddingData } from '../data/weddingData';
import { Calendar } from 'lucide-react';

export default function StickyRSVPBar() {
  const weddingDate = new Date(weddingData.date);
  const dateStr = weddingDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const scrollToRSVP = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-brand-black/90 backdrop-blur-md rounded-full pl-5 pr-2 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
        <Calendar size={14} className="text-brand-gold flex-shrink-0" />
        <span className="text-brand-cream/80 text-[11px] tracking-wide whitespace-nowrap">
          {dateStr}
        </span>
        <button
          onClick={scrollToRSVP}
          className="px-5 py-2 bg-brand-gold-light text-brand-black rounded-full text-[10px] font-semibold tracking-[0.15em] hover:brightness-110 transition-all whitespace-nowrap"
        >
          RSVP NOW
        </button>
      </div>
    </div>
  );
}
