import { useState } from 'react';
import { weddingData } from '../data/weddingData';
import { Copy, Check, CreditCard, Heart } from 'lucide-react';

export default function Gifts() {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  const copyAll = () => {
    const text = weddingData.bankAccounts
      .map((a) => `${a.bank}\n${a.accountName}\n${a.accountNumber}`)
      .join('\n\n');
    copyToClipboard(text, 'all');
  };

  return (
    <section className="py-24 lg:py-36 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] font-semibold tracking-[0.3em] text-brand-gold uppercase mb-4">
            REGISTRY & BLESSINGS
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-espresso mb-4">
            Gifts
          </h2>
          <p className="font-serif italic text-brand-gray text-lg mb-6">
            Your kindness means a lot
          </p>
          <p className="text-brand-gray text-sm leading-relaxed max-w-lg mx-auto">
            Your presence at our wedding is the greatest gift of all. However, if you wish to
            honour us with a gift, we have provided options below.
          </p>
        </div>

        {/* Bank Transfer Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {weddingData.bankAccounts.map((account, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-brand-border p-8 lg:p-10 shadow-[0_15px_40px_rgba(20,17,12,0.06)] text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <CreditCard size={18} className="text-brand-gold" />
                <h3 className="font-serif text-2xl text-brand-espresso">{account.bank}</h3>
              </div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-brand-gray mb-6">
                {account.type}
              </p>

              <div className="mb-4">
                <p className="text-[10px] tracking-[0.2em] text-brand-gray mb-1">ACCOUNT NAME</p>
                <p className="font-medium text-brand-espresso">{account.accountName}</p>
              </div>

              <div className="mb-6">
                <p className="text-[10px] tracking-[0.2em] text-brand-gray mb-1">
                  ACCOUNT NUMBER
                </p>
                <p className="font-serif text-2xl font-semibold text-brand-espresso">
                  {account.accountNumber}
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(account.accountNumber, i)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-black text-brand-cream rounded-full text-[10px] font-semibold tracking-[0.12em] hover:brightness-150 transition-all"
              >
                {copiedId === i ? (
                  <>
                    <Check size={14} /> COPIED
                  </>
                ) : (
                  <>
                    <Copy size={14} /> COPY
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={copyAll}
            className="inline-flex items-center gap-2 px-8 py-3 bg-brand-cream border border-brand-border text-brand-espresso rounded-full text-[10px] font-semibold tracking-[0.12em] hover:bg-white transition-all"
          >
            {copiedId === 'all' ? (
              <>
                <Check size={14} /> COPIED ALL
              </>
            ) : (
              <>
                <Copy size={14} /> COPY BOTH ACCOUNT DETAILS
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
