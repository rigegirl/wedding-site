
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Music2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import { musicTracks, musicCredits } from '../data/musicTracks';

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

  const changeTrack = useCallback((direction) => {
    setIndex((current) => {
      const total = musicTracks.length;
      return (current + direction + total) % total;
    });
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.6;
    audioRef.current = audio;

    const handlePlay = () => {
      setPlaying(true);
      setError(false);
    };

    const handlePause = () => setPlaying(false);

    const handleError = () => {
      setPlaying(false);
      setError(true);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track?.src) return;

    setError(false);
    audio.src = track.src;
    audio.load();

    audio.play().then(() => {
      userOptedInRef.current = true;
    }).catch(() => {
      setPlaying(false);
    });
  }, [index, track?.src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.muted = muted;
  }, [muted]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      userOptedInRef.current = true;
      setError(false);

      if (!audio.src && track?.src) {
        audio.src = track.src;
        audio.load();
      }

      await audio.play();
    } catch {
      setPlaying(false);
      setError(true);
    }
  }, [track]);

  const pause = useCallback(() => {
    userOptedInRef.current = false;
    audioRef.current?.pause();
  }, []);

  const togglePlay = () => {
    if (playing) pause();
    else play();
  };

  if (!track) return null;

  return (
    <div className="fixed top-[92px] right-3 sm:top-auto sm:bottom-4 sm:right-4 z-[55] w-[calc(100%-1.5rem)] max-w-xs">
      <div className="overflow-hidden rounded-2xl border border-brand-gold/30 bg-brand-dark/95 text-brand-cream shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Collapse music player' : 'Expand music player'}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold"
          >
            <Music2 size={21} />
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="min-w-0 flex-1 text-left"
          >
            <p className="truncate text-sm font-semibold">{track.title}</p>
            <p className="truncate text-xs text-brand-cream/60">
              {track.performer || track.composer}
            </p>
          </button>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? 'Pause music' : 'Play music'}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-dark transition hover:opacity-90"
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Hide music controls' : 'Show music controls'}
            className="text-brand-cream/70 transition hover:text-brand-cream"
          >
            {open ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-brand-cream/10 px-4 pb-4 pt-3">
            <p className="mb-1 text-sm font-medium">{track.title}</p>
            <p className="mb-3 text-xs leading-relaxed text-brand-cream/60">
              {track.mood} · {track.moment}
            </p>

            <div className="flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => changeTrack(-1)}
                aria-label="Previous track"
                disabled={musicTracks.length < 2}
                className="text-brand-cream/80 transition hover:text-brand-gold disabled:opacity-40"
              >
                <SkipBack size={19} />
              </button>

              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? 'Pause music' : 'Play music'}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gold text-brand-dark transition hover:opacity-90"
              >
                {playing ? <Pause size={20} /> : <Play size={20} />}
              </button>

              <button
                type="button"
                onClick={() => changeTrack(1)}
                aria-label="Next track"
                disabled={musicTracks.length < 2}
                className="text-brand-cream/80 transition hover:text-brand-gold disabled:opacity-40"
              >
                <SkipForward size={19} />
              </button>

              <button
                type="button"
                onClick={() => setMuted((value) => !value)}
                aria-label={muted ? 'Unmute music' : 'Mute music'}
                className="text-brand-cream/80 transition hover:text-brand-gold"
              >
                {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
              </button>
            </div>

            {error && (
              <p className="mt-3 text-center text-xs text-red-300">
                The song could not be loaded. Check that the audio file
                exists in public/music, then try playing it again.
              </p>
            )}

            <div className="mt-3 border-t border-brand-cream/10 pt-3">
              <button
                type="button"
                onClick={() => setCreditsOpen((value) => !value)}
                className="flex w-full items-center justify-between text-left text-xs text-brand-cream/60 transition hover:text-brand-gold"
              >
                <span>Song credits</span>
                {creditsOpen ? (
                  <ChevronUp size={15} />
                ) : (
                  <ChevronDown size={15} />
                )}
              </button>

              {creditsOpen && (
                <div className="mt-3 text-[11px] leading-relaxed text-brand-cream/60">
                  <p className="mb-2">{musicCredits.statement}</p>

                  {musicCredits.performerUrl && (
                    <a
                      href={musicCredits.performerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline transition hover:text-brand-gold"
                    >
                      View song source
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
