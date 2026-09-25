import { useState, useRef } from 'react';
import { weddingData } from '../data/weddingData';
import { CalendarPlus, MapPin, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

function fireConfetti() {
  const colors = ['#75074B', '#334A33', '#B49E77', '#F9F9F1'];
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors,
  });
}

function generateGoogleCalUrl() {
  const d = new Date(weddingData.date);
  const start = d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endDate = new Date(d.getTime() + 6 * 60 * 60 * 1000);
  const end = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  return `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(
    `${weddingData.couple.partner1} & ${weddingData.couple.partner2}'s Wedding`
  )}&dates=${start}/${end}&location=${encodeURIComponent(weddingData.location)}&details=${encodeURIComponent(
    'Wedding celebration! ' + weddingData.couple.hashtag
  )}`;
}

export default function SaveTheDate() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const weddingDate = new Date(weddingData.date);
  const dateStr = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleCalendarClick = (type) => {
    fireConfetti();
    if (type === 'google') {
      window.open(generateGoogleCalUrl(), '_blank');
    }
    setDropdownOpen(false);
  };

  return (
    <section className="pb-24 lg:pb-36 px-6">
      <div className="max-w-[900px] mx-auto text-center mb-16">
        <p className="text-[11px] font-semibold tracking-[0.3em] text-brand-gold uppercase mb-4">
          SAVE THE DATE
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-espresso mb-8">
          This Day
        </h2>
        <div className="inline-block bg-white rounded-2xl border border-brand-border px-12 py-8 shadow-[0_15px_40px_rgba(20,17,12,0.06)]">
          <p className="font-serif text-2xl lg:text-3xl text-brand-espresso">{dateStr}</p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-6">
        {/* Save the Date Card */}
        <div className="relative bg-white rounded-3xl border border-brand-border overflow-hidden shadow-[0_15px_40px_rgba(20,17,12,0.06)] p-10 lg:p-14 flex flex-col justify-center items-center text-center">
          <CalendarPlus size={36} className="text-brand-gold mb-6" />
          <h3 className="font-serif text-3xl lg:text-4xl text-brand-espresso mb-4">
            Save the Date
          </h3>
          <p className="text-brand-gray text-sm leading-relaxed mb-8 max-w-sm">
            We are so excited to celebrate our special day with you. Add the wedding to your
            calendar to stay updated!
          </p>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-8 py-3.5 bg-brand-black text-brand-cream rounded-full text-[11px] font-semibold tracking-[0.12em] hover:brightness-150 transition-all duration-300"
            >
              <CalendarPlus size={16} />
              ADD WEDDING TO CALENDAR
              <span className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}>
                ▾
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl border border-brand-border overflow-hidden z-20 min-w-[220px]">
                <button
                  onClick={() => handleCalendarClick('google')}
                  className="w-full px-6 py-3 text-left text-sm text-brand-espresso hover:bg-brand-cream transition-colors"
                >
                  Google Calendar
                </button>
                <button
                  onClick={() => handleCalendarClick('outlook')}
                  className="w-full px-6 py-3 text-left text-sm text-brand-espresso hover:bg-brand-cream transition-colors border-t border-brand-border"
                >
                  Outlook Calendar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Venue Card */}
        <div className="relative bg-brand-black rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(20,17,12,0.15)] text-brand-cream">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
            alt="Venue"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative z-10 p-10 lg:p-14">
            <div className="flex items-center gap-2 mb-8">
              <MapPin size={16} className="text-brand-gold" />
              <span className="text-[11px] font-semibold tracking-[0.25em] text-brand-gold uppercase">
                VENUE & LOCATION
              </span>
            </div>

            <div className="mb-8">
              <h4 className="font-serif text-2xl mb-2">Church</h4>
              <p className="text-brand-cream/70 text-sm leading-relaxed">
                {weddingData.venues.church.name},<br />
                {weddingData.venues.church.address}
              </p>
            </div>

            <div className="mb-10">
              <h4 className="font-serif text-2xl mb-2">Reception</h4>
              <p className="text-brand-cream/70 text-sm leading-relaxed">
                {weddingData.venues.reception.name},<br />
                {weddingData.venues.reception.address}
              </p>
            </div>

            <hr className="border-white/10 mb-8" />

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={weddingData.venues.church.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-espresso text-brand-cream rounded-full text-[10px] font-semibold tracking-[0.12em] hover:brightness-150 transition-all flex-1"
              >
                CHURCH DIRECTIONS
                <ExternalLink size={13} />
              </a>
              <a
                href={weddingData.venues.reception.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold-light text-brand-black rounded-full text-[10px] font-semibold tracking-[0.12em] hover:brightness-110 transition-all flex-1"
              >
                RECEPTION DIRECTIONS
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
