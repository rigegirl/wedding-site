import { weddingData } from '../data/weddingData';
import { Church, UtensilsCrossed } from 'lucide-react';

const icons = {
  'Church Wedding': Church,
  'Reception & Banquet': UtensilsCrossed,
};

export default function Programme() {
  return (
    <section id="programme" className="py-24 lg:py-36 px-6" style={{ scrollMarginTop: '100px' }}>
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-20">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-brand-gold uppercase mb-4">
            ORDER OF EVENTS
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-espresso">
            Programme
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-[1px] bg-brand-border hidden lg:block" />

          {weddingData.programme.map((event, i) => {
            const Icon = icons[event.title] || Church;
            const isLeft = i % 2 === 0;

            return (
              <div key={i} className="relative mb-20 last:mb-0">
                {/* Mobile layout */}
                <div className="lg:hidden">
                  <div className="flex items-start gap-5">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-brand-cream border-2 border-brand-gold/30 flex items-center justify-center">
                        <Icon size={18} className="text-brand-gold" />
                      </div>
                      {i < weddingData.programme.length - 1 && (
                        <div className="w-[1px] h-20 bg-brand-border mt-2" />
                      )}
                    </div>
                    <div className="pt-1">
                      <span className="text-[11px] font-semibold tracking-[0.15em] text-brand-gold">
                        {event.time}
                      </span>
                      <h3 className="font-serif text-2xl text-brand-espresso mt-1">{event.title}</h3>
                      <p className="font-serif italic text-brand-gray text-sm mt-1">{event.subtitle}</p>
                      <p className="text-brand-gray text-sm leading-relaxed mt-3">{event.description}</p>
                      {event.tag && (
                        <span className="inline-block mt-3 px-3 py-1 bg-brand-cream border border-brand-border rounded-full text-[9px] font-semibold tracking-[0.15em] text-brand-gray">
                          {event.tag}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden lg:grid lg:grid-cols-[1fr_60px_1fr] items-start">
                  <div className={`${isLeft ? '' : 'col-start-3'} ${isLeft ? 'text-right pr-10' : 'pl-10'}`}>
                    <span className="text-[11px] font-semibold tracking-[0.15em] text-brand-gold">
                      {event.time}
                    </span>
                    <h3 className="font-serif text-3xl text-brand-espresso mt-1">{event.title}</h3>
                    <p className="font-serif italic text-brand-gray mt-1">{event.subtitle}</p>
                    <p className="text-brand-gray text-sm leading-relaxed mt-3">{event.description}</p>
                    {event.tag && (
                      <span className="inline-block mt-3 px-3 py-1 bg-brand-cream border border-brand-border rounded-full text-[9px] font-semibold tracking-[0.15em] text-brand-gray">
                        {event.tag}
                      </span>
                    )}
                  </div>

                  <div className="col-start-2 row-start-1 flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-brand-cream border-2 border-brand-gold/30 flex items-center justify-center z-10">
                      <Icon size={20} className="text-brand-gold" />
                    </div>
                  </div>

                  {isLeft && <div />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
