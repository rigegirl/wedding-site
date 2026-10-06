import { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, SkipForward, SkipBack, Music, X } from 'lucide-react';
import { musicTracks, musicCredits } from '../data/musicTracks';

/**
 * Ambient music player.
 *
 * AUTOPLAY: every modern browser blocks unmuted audio until a real user gesture,
 * and iOS Safari additionally requires that gesture to land on the element that
 * will actually play. So we never attempt autoplay on load — the listener taps
 * the button first. We start at a moderate volume — audible across the room for
 * the ceremony, but not a surprise blast — and the listener can mute at any time.
 *
 * Track switching only resumes playback if the user had already opted in, so
 * changing tracks never starts sound on its own.
 */
export default function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);

  const audioRef = useRef(null);
  const userOptedInRef = useRef(false);

  const track = musicTracks[index];

  // Functional update so rapid next/prev taps can never race a stale closure.
  const changeTrack = useCallback((direction) => {
    const delta = direction === 'next' ? 1 : -1;
    setIndex((i) => (i + delta + musicTracks.length) % musicTracks.length);
  }, []);

  // Create the single <audio> element once and reuse it for every track.
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'none';
    audio.volume = 0.6;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  // Mirror real playback state so the UI can never claim to be playing when it isn't.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => {
      setError(true);
      setPlaying(false);
    };
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
    };
  }, []);

  // Load whichever track is selected.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setError(false);
    audio.src = track.src;
    if (userOptedInRef.current) {
      audio.currentTime = 0;
      const attempt = audio.play();
      if (attempt?.catch) attempt.catch(() => setError(true));
    }
  }, [index, track.src]);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setError(false);
    if (!audio.src) audio.src = track.src;
    userOptedInRef.current = true;

    // play() can still be rejected if the element was created outside the
    // originating task. Retrying synchronously is the standard escape hatch.
    const attempt = audio.play();
    if (attempt?.catch) {
      attempt.catch(async () => {
        try {
          await audio.play();
        } catch {
          setError(true);
        }
      });
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    userOptedInRef.current = false;
    audio.pause();
  };

  const toggle = () => (playing ? pause() : play());

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full bg-brand-black/90 backdrop-blur-md flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:bg-brand-black transition-colors"
        aria-label={open ? 'Close music panel' : 'Open music player'}
        aria-expanded={open}
      >
        {open ? (
          <X size={15} className="text-brand-gold" />
        ) : (
          <Music size={15} className={playing ? 'text-brand-gold' : 'text-brand-cream/50'} />
        )}
      </button>

      {open && (
        <div className="fixed bottom-20 left-6 z-50 w-[min(320px,calc(100vw-3rem))] rounded-2xl bg-brand-black/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-5">
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-brand-wine/25 border border-brand-gold/30 flex items-center justify-center shrink-0">
                <Music size={14} className="text-brand-gold" />
              </div>
              <div className="min-w-0">
                <p className="text-brand-gold-light text-[10px] tracking-[0.25em] uppercase mb-1">
                  Now playing
                </p>
                <p className="font-serif text-brand-cream text-base leading-tight truncate">
                  {track.title}
                </p>
                <p className="text-[11px] text-brand-cream/50 truncate">{track.composer}</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-brand-cream/40 hover:text-brand-cream transition-colors shrink-0"
              aria-label="Close music panel"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 mb-5">
            <button
              onClick={() => changeTrack('prev')}
              className="text-brand-cream/50 hover:text-brand-gold transition-colors"
              aria-label="Previous track"
            >
              <SkipBack size={16} />
            </button>
            <button
              onClick={toggle}
              className="w-11 h-11 rounded-full border border-brand-gold/40 flex items-center justify-center hover:bg-brand-gold/10 transition-colors"
              aria-label={playing ? 'Pause music' : 'Play music'}
            >
              {playing ? (
                <Volume2 size={15} className="text-brand-gold" />
              ) : (
                <VolumeX size={15} className="text-brand-cream/60" />
              )}
            </button>
            <button
              onClick={() => changeTrack('next')}
              className="text-brand-cream/50 hover:text-brand-gold transition-colors"
              aria-label="Next track"
            >
              <SkipForward size={16} />
            </button>
            <button
              onClick={toggleMute}
              className="ml-1 text-[10px] tracking-[0.2em] uppercase text-brand-cream/40 hover:text-brand-cream transition-colors"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? 'Unmute' : 'Mute'}
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-brand-cream/35 mb-1">
            <span className="tracking-[0.2em] uppercase">Ambience</span>
            <span>{track.bpm} BPM</span>
          </div>
          <p className="text-[11px] text-brand-cream/45 leading-relaxed mb-4">
            {track.mood} · {track.moment}
          </p>

          <button
            onClick={() => setCreditsOpen((c) => !c)}
            className="w-full text-left text-[10px] tracking-[0.2em] uppercase text-brand-cream/30 hover:text-brand-gold transition-colors border-t border-white/10 pt-3"
          >
            {creditsOpen ? 'Hide music credits' : 'Music credits'}
          </button>

          {creditsOpen && (
            <div className="mt-3 text-[11px] text-brand-cream/45 leading-relaxed">
              <p className="mb-2">{musicCredits.statement}</p>
              <ul className="space-y-1 mb-3">
                {musicTracks.map((t) => (
                  <li key={t.id}>
                    <span className="text-brand-cream/70">{t.title}</span> —{' '}
                    <a
                      href={t.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-brand-gold transition-colors"
                    >
                      {t.license}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={musicCredits.performerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brand-gold transition-colors"
              >
                Performances by Kevin MacLeod
              </a>
            </div>
          )}

          {error && (
            <p className="mt-3 text-[11px] text-brand-cream/40">
              This track could not be loaded. Please try again.
            </p>
          )}
        </div>
      )}
    </>
  );
}
