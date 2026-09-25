import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ images, currentIndex, onClose, onChangeIndex }) {
  const goPrev = useCallback(() => {
    onChangeIndex((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onChangeIndex]);

  const goNext = useCallback(() => {
    onChangeIndex((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onChangeIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, goPrev, goNext]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />

      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-brand-espresso/80 text-white flex items-center justify-center hover:bg-brand-espresso transition-colors"
        aria-label="Close"
      >
        <X size={22} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 lg:left-8 z-10 w-12 h-12 rounded-full bg-brand-espresso/80 text-white flex items-center justify-center hover:bg-brand-espresso transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 lg:right-8 z-10 w-12 h-12 rounded-full bg-brand-espresso/80 text-white flex items-center justify-center hover:bg-brand-espresso transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      <img
        src={images[currentIndex]}
        alt=""
        className="relative z-10 max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
      />
    </div>
  );
}
