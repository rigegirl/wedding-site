import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full bg-brand-black/90 backdrop-blur-md flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:bg-brand-black transition-colors"
      aria-label={playing ? 'Mute music' : 'Play music'}
    >
      {playing ? (
        <Volume2 size={16} className="text-brand-gold" />
      ) : (
        <VolumeX size={16} className="text-brand-cream/50" />
      )}
    </button>
  );
}
