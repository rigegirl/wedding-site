import { useState, useEffect, useCallback } from 'react';
import { weddingData } from '../data/weddingData';
import { ChevronDown } from 'lucide-react';

const navItems = [
  { id: 'welcome', label: 'WELCOME' },
  { id: 'programme', label: 'PROGRAMME' },
  { id: 'colours', label: 'COLOURS' },
  { id: 'Gifts', label: 'GIFTS' },
  { id: 'qna', label: 'Q & A' },
  { id: 'rsvp', label: 'KINDLY RSVP' },
  { id: 'gallery', label: 'GALLERY' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('welcome');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        return { id: item.id, top: el.getBoundingClientRect().top };
      });

      const current = sections.reduce((closest, section) => {
        if (section.top <= 120 && section.top > closest.top) return section;
        return closest;
      }, { id: 'welcome', top: -Infinity });

      if (current.id) setActiveSection(current.id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
      style={{ backgroundColor: '#61284a' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-[80px] lg:h-[100px]">
        {/* Logo */}
        <button onClick={() => scrollTo('welcome')} className="flex-shrink-0">
         <img
  src="/src/assets/wedding-logo.jpg"
  alt="Wedding logo"
  className="w-[60px] h-[60px] lg:w-[75px] lg:h-[75px] object-contain"
/>
</button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-[11px] font-medium tracking-[0.2em] transition-all duration-300 pb-1 border-b-[1.5px] ${
                activeSection === item.id
                  ? 'text-brand-wine border-brand-wine'
                  : 'text-brand-cream/70 border-transparent hover:text-brand-cream'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* RSVP Button */}
        <button
          onClick={() => scrollTo('rsvp')}
          className="hidden lg:flex items-center px-7 py-2.5 rounded-full bg-brand-wine text-brand-cream text-[11px] font-semibold tracking-[0.15em] hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300"
        >
          KINDLY RSVP
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-brand-wine transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-brand-wine transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-brand-wine transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-brand-espresso border-t border-white/10 pb-6">
          <nav className="flex flex-col items-center gap-4 pt-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-[12px] tracking-[0.2em] transition-colors ${
                  activeSection === item.id ? 'text-brand-wine' : 'text-brand-cream/70'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('rsvp')}
              className="mt-2 px-8 py-2.5 rounded-full bg-brand-wine-light text-brand-black text-[11px] font-semibold tracking-[0.15em]"
            >
              KINDLY RSVP
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
