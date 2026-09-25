import { useState, useEffect } from 'react';
import { weddingData } from '../data/weddingData';
import { Clock } from 'lucide-react';

function getTimeLeft(targetDate) {
  const diff = new Date(targetDate) - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft(weddingData.date));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeLeft(weddingData.date));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: 'DAYS', value: time.days },
    { label: 'HOURS', value: time.hours },
    { label: 'MINUTES', value: time.minutes },
    { label: 'SECONDS', value: time.seconds },
  ];

  const weddingDate = new Date(weddingData.date);
  const dateStr = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="py-24 lg:py-36 px-6">
      <div className="max-w-[900px] mx-auto text-center">
        <p className="text-[11px] font-semibold tracking-[0.3em] text-brand-gold uppercase mb-4">
          THE JOURNEY BEGINS
        </p>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-espresso mb-4">
          Event Starts In
        </h2>

        <p className="font-serif italic text-brand-gray text-lg mb-16">
          Counting down every second until we say &ldquo;I Do&rdquo;
        </p>

        <div className="grid grid-cols-4 gap-4 lg:gap-8 mb-16">
          {units.map((unit) => (
            <div key={unit.label} className="text-center">
              <span className="font-serif text-5xl sm:text-7xl lg:text-9xl font-light text-brand-espresso leading-none">
                {String(unit.value).padStart(2, '0')}
              </span>
              <p className="text-[10px] tracking-[0.25em] text-brand-gray mt-3 font-medium">
                {unit.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-brand-gray">
          <Clock size={16} />
          <span className="text-sm font-medium">{dateStr}</span>
        </div>
      </div>
    </section>
  );
}
