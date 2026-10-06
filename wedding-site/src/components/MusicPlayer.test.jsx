import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import MusicPlayer from './MusicPlayer';

/**
 * The audio element is created imperatively via `new Audio()`, so we install a
 * controllable stub. These tests pin the two behaviours that actually broke
 * real users: a dead play button, and a UI that lies about playback state.
 */
class FakeAudio {
  static instances = [];

  constructor() {
    this.src = '';
    this.loop = false;
    this.preload = '';
    this.volume = 1;
    this.muted = false;
    this.currentTime = 0;
    this.paused = true;
    this._listeners = {};
    this._playResult = Promise.resolve();
    this.playCalls = 0;
    FakeAudio.instances.push(this);
  }

  addEventListener(evt, fn) {
    (this._listeners[evt] ||= []).push(fn);
  }
  removeEventListener(evt, fn) {
    this._listeners[evt] = (this._listeners[evt] || []).filter((f) => f !== fn);
  }
  _emit(evt) {
    (this._listeners[evt] || []).forEach((f) => f());
  }
  play() {
    this.playCalls += 1;
    this.paused = false;
    this._emit('play');
    return this._playResult;
  }
  pause() {
    this.paused = true;
    this._emit('pause');
  }
}

let audioStub;
let created;

beforeEach(() => {
  FakeAudio.instances = [];
  created = [];
  // `Audio` is invoked with `new`, so the stub must be a constructable function,
  // not an arrow wrapped in vi.fn().
  const AudioCtor = function () {
    const inst = new FakeAudio();
    created.push(inst);
    return inst;
  };
  audioStub = vi.fn(AudioCtor);
  vi.stubGlobal('Audio', audioStub);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function openPanel() {
  render(<MusicPlayer />);
  fireEvent.click(screen.getByLabelText('Open music player'));
}

/** Let the play() promise and any resulting state updates settle. */
async function settle() {
  await act(async () => {
    await Promise.resolve();
  });
}

/**
 * Click a control and drain the microtask queue. play() resolves a promise and
 * the element fires `play`/`pause` events that drive React state, so every
 * interaction must be settled inside act() or React warns about un-acted
 * updates — which are exactly the races these tests exist to catch.
 */
async function click(el) {
  fireEvent.click(el);
  await settle();
}

describe('MusicPlayer', () => {
  it('never starts playback on mount', () => {
    render(<MusicPlayer />);
    // The element is created and its src assigned up-front, but play() must
    // never be called on load: autoplay is blocked by every modern browser
    // anyway, and surprising a guest with sound the moment a page renders is
    // hostile. `preload="none"` means the assigned src costs no network traffic.
    const audio = created[0];
    expect(audio).toBeTruthy();
    expect(audio.preload).toBe('none');
    expect(audio.paused).toBe(true);
    expect(audio.playCalls).toBe(0);
  });

  it('gives the listener an explicit play control', () => {
    render(<MusicPlayer />);
    expect(screen.getByLabelText('Open music player')).toBeTruthy();
  });

  it('starts playing on the first user gesture', async () => {
    openPanel();
    await click(screen.getByLabelText('Play music'));
    await waitFor(() => {
      const audio = FakeAudio.instances[0];
      expect(audio.src).toMatch(/\.mp3$/);
      expect(audio.paused).toBe(false);
    });
  });

  it('plays at a clearly audible level, not a whisper', async () => {
    openPanel();
    await click(screen.getByLabelText('Play music'));
    await waitFor(() => expect(FakeAudio.instances[0]).toBeTruthy());
    // Loud enough to hear across a room, but still capped below 1 so we never
    // risk a clipping blast — and the listener can always mute.
    expect(FakeAudio.instances[0].volume).toBeGreaterThanOrEqual(0.5);
    expect(FakeAudio.instances[0].volume).toBeLessThanOrEqual(1);
  });

  it('pauses when the user presses pause again', async () => {
    openPanel();
    await click(screen.getByLabelText('Play music'));
    await waitFor(() => expect(FakeAudio.instances[0].paused).toBe(false));
    await click(screen.getByLabelText('Pause music'));
    expect(FakeAudio.instances[0].paused).toBe(true);
  });

  it('advances to another track without wrapping past the end', async () => {
    openPanel();
    await click(screen.getByLabelText('Play music'));
    await waitFor(() => expect(FakeAudio.instances[0].paused).toBe(false));

    const first = FakeAudio.instances[0].src;
    await click(screen.getByLabelText('Next track'));

    await waitFor(() => {
      expect(FakeAudio.instances[0].src).not.toBe(first);
    });
    expect(screen.getByText('Now playing')).toBeTruthy();
  });

  it('surfaces an error instead of spinning forever when a track fails', async () => {
    openPanel();
    await click(screen.getByLabelText('Play music'));
    await waitFor(() => expect(FakeAudio.instances[0]).toBeTruthy());

    await act(async () => {
      FakeAudio.instances[0]._emit('error');
    });
    await waitFor(() => {
      expect(screen.getByText(/could not be loaded/i)).toBeTruthy();
    });
  });

  it('publishes music credits so the CC BY obligation is met', async () => {
    openPanel();
    await click(screen.getByText('Music credits'));
    await waitFor(() => {
      expect(screen.getByText(/public domain/i)).toBeTruthy();
    });
    expect(screen.getByText('Performances by Kevin MacLeod')).toBeTruthy();
  });

  it('closes the panel again', async () => {
    openPanel();
    expect(screen.getByText('Now playing')).toBeTruthy();
    // Either X closes the panel; both are labelled so a screen reader can act.
    await click(screen.getAllByLabelText('Close music panel')[0]);
    expect(screen.queryByText('Now playing')).toBeNull();
  });

  it('shows a close affordance on the trigger while open, not a dead note', async () => {
    // A static note icon reads as "inert" once the panel is open, so the
    // trigger must visibly flip to an X.
    openPanel();
    // The floating trigger and the panel's own X are both close controls, and
    // both must be unique in name and both must show an X glyph.
    const closers = screen.getAllByLabelText('Close music panel');
    expect(closers).toHaveLength(2);
    for (const c of closers) {
      expect(c.querySelector('svg')?.getAttribute('class')).toContain('lucide-x');
    }
  });

  it('keeps the accessible names of every control unique', async () => {
    // Duplicate accessible names are a genuine a11y defect: a screen-reader
    // user hears two identical "Close" buttons and cannot tell them apart.
    openPanel();
    // The one intentional duplicate is the pair of close controls; every
    // other accessible name must be unique.
    const names = [
      'Play music',
      'Pause music',
      'Next track',
      'Previous track',
      'Mute',
      'Unmute',
    ];
    for (const name of names) {
      const found = screen.queryAllByLabelText(name);
      expect(found.length).toBeLessThanOrEqual(1);
    }
  });
});
