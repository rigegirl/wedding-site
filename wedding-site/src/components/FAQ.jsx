import { useState } from 'react';
import { weddingData } from '../data/weddingData';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="qna" className="py-24 lg:py-36 px-6" style={{ scrollMarginTop: '100px' }}>
      <div className="max-w-[750px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-brand-gold uppercase mb-4">
            Q & A
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-espresso mb-4">
            Questions & Answers
          </h2>
          <p className="font-serif italic text-brand-gray text-lg">
            If you have any questions, please check our Q & A section first!
          </p>
        </div>

        <div className="space-y-3">
          {weddingData.faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-[0_4px_16px_rgba(20,17,12,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(20,17,12,0.08)]"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-7 py-5 text-left"
              >
                <span className="font-medium text-brand-espresso text-[15px] pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-brand-gray flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  openIndex === i ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-7 pb-6">
                  <p className="text-brand-gray text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
