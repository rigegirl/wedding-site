import { useState } from 'react';
import { weddingData } from '../data/weddingData';
import { Heart, ShoppingBag, Gift, Clock } from 'lucide-react';

export default function Wishlist() {
  const [items, setItems] = useState(weddingData.wishlist);

  const formatPrice = (price) => {
    if (!price) return '';
    return '₦' + price.toLocaleString();
  };

  return (
    <section id="wishlist" className="py-24 lg:py-36 px-6" style={{ scrollMarginTop: '100px' }}>
      <div className="max-w-[1100px] mx-auto">
        {/* Wishlist Intro */}
        <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-[0_15px_40px_rgba(20,17,12,0.06)] mb-16 grid lg:grid-cols-2">
          <div className="h-[300px] lg:h-auto">
            <img
              src="https://images.unsplash.com/photo-1606216794079-73f85bbd57d5?w=800&q=80"
              alt="Couple"
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(80%)' }}
            />
          </div>
          <div className="p-10 lg:p-14 flex flex-col justify-center">
            <p className="text-[11px] font-semibold tracking-[0.3em] text-brand-gold uppercase mb-4">
              WEDDING REGISTRY
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl text-brand-espresso mb-4">
              Our Wishlist
            </h2>
            <p className="text-brand-gray text-sm leading-relaxed mb-8">
              To help us start our new home together, we have handpicked items we need most. You can
              select any item to pay for it and bless our union directly.
            </p>
            <button className="self-start flex items-center gap-2 px-8 py-3.5 bg-brand-black text-brand-cream rounded-full text-[11px] font-semibold tracking-[0.12em] hover:brightness-150 transition-all">
              <ShoppingBag size={16} />
              VIEW CURATED REGISTRY
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-[0_15px_40px_rgba(20,17,12,0.06)] flex flex-col"
            >
              {/* Image */}
              <div className="relative h-[220px] bg-brand-cream overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover ${
                      item.status === 'gifted' ? 'blur-[2px] opacity-70' : ''
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Gift size={48} className="text-brand-gold/40" />
                  </div>
                )}

                {item.status === 'gifted' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-2xl px-6 py-4 text-center shadow-lg">
                      <Heart size={20} className="mx-auto text-brand-wine mb-2" fill="#75074B" />
                      <p className="font-serif text-lg text-brand-espresso">Gifted with love</p>
                      <p className="text-[10px] tracking-[0.15em] text-brand-gray mt-1">
                        BY {item.giftedBy?.toUpperCase()}
                      </p>
                    </div>
                  </div>
                )}

                {item.status === 'reserved' && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-brand-gold-light text-brand-black rounded-full text-[9px] font-semibold tracking-[0.1em]">
                    Reserved
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-[9px] font-semibold tracking-[0.2em] text-brand-gold uppercase mb-1">
                  {item.category}
                </p>
                <h3 className="font-serif text-xl text-brand-espresso mb-2">{item.title}</h3>
                <p className="text-brand-gray text-xs leading-relaxed mb-4 flex-1">
                  {item.description}
                </p>

                {item.price && (
                  <p className="font-serif text-2xl font-bold text-brand-espresso mb-4">
                    {formatPrice(item.price)}
                  </p>
                )}

                {item.status === 'reserved' && (
                  <div className="bg-brand-cream rounded-xl p-3 mb-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-brand-gold mb-1">
                      <Clock size={12} />
                      <span className="text-[9px] font-semibold tracking-[0.15em]">RESERVED</span>
                    </div>
                    <p className="text-[10px] text-brand-gray">By {item.reservedBy}</p>
                    <p className="text-[10px] text-brand-gray">
                      HELD TILL {item.reservedUntil}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  {item.status === 'available' && !item.isCashGift && (
                    <>
                      <button className="flex-1 py-2.5 bg-brand-black text-brand-cream rounded-full text-[10px] font-semibold tracking-[0.1em] hover:brightness-150 transition-all">
                        PAY FOR ITEM
                      </button>
                      <button className="flex-1 py-2.5 bg-white border border-brand-border text-brand-espresso rounded-full text-[10px] font-semibold tracking-[0.1em] hover:bg-brand-cream transition-all">
                        RESERVE
                      </button>
                    </>
                  )}
                  {item.isCashGift && (
                    <button className="flex-1 py-2.5 bg-brand-gold-light text-brand-black rounded-full text-[10px] font-semibold tracking-[0.1em] hover:brightness-110 transition-all">
                      GIVE
                    </button>
                  )}
                  {item.status === 'gifted' && (
                    <button className="flex-1 py-2.5 bg-white border border-brand-border text-brand-espresso rounded-full text-[10px] font-semibold tracking-[0.1em] hover:bg-brand-cream transition-all">
                      GIFT AGAIN
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
