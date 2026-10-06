import { describe, it, expect } from 'vitest';
import { musicTracks, musicCredits } from './musicTracks';

/**
 * The music playlist is the one part of this site that carries a legal
 * obligation rather than just a visual one. These tests lock the invariants
 * that keep the site publishable.
 */
describe('musicTracks', () => {
  it('is not empty', () => {
    expect(musicTracks.length).toBeGreaterThan(0);
  });

  it('exposes no duplicate track ids', () => {
    const ids = musicTracks.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('exposes no duplicate sources', () => {
    const srcs = musicTracks.map((t) => t.src);
    expect(new Set(srcs).size).toBe(srcs.length);
  });

  /**
   * Safari on iOS/macOS cannot decode Ogg Vorbis. A single .oga in the list
   * means the track plays on Android and silently fails on iPhone.
   */
  it('ships MP3 only so Safari can decode every track', () => {
    for (const t of musicTracks) {
      expect(
        t.src.toLowerCase(),
        `${t.title} is not MP3 — Safari cannot decode it`
      ).toMatch(/\.mp3(\?|$)/);
    }
  });

  it('only streams over HTTPS from an explicit origin', () => {
    for (const t of musicTracks) {
      expect(t.src.startsWith('https://')).toBe(true);
      expect(() => new URL(t.src)).not.toThrow();
    }
  });

  /**
   * CC BY is an attribution licence: shipping without credit is a licence
   * violation, not a nitpick.
   */
  it('carries CC BY attribution and a licence link on every track', () => {
    for (const t of musicTracks) {
      expect(t.license, `${t.title} missing licence`).toMatch(/^CC BY/);
      expect(t.attribution, `${t.title} missing attribution`).toBeTruthy();
      expect(t.licenseUrl, `${t.title} missing licence link`).toMatch(
        /^https:\/\/creativecommons\.org\/licenses\/by\//
      );
    }
  });

  it('credits the performer in the attribution string', () => {
    for (const t of musicTracks) {
      expect(t.attribution).toMatch(/Kevin MacLeod|Pachelbel/);
    }
  });

  it('keeps the tempo gentle enough to talk over', () => {
    for (const t of musicTracks) {
      expect(t.bpm, `${t.title} at ${t.bpm} BPM is too loud to talk over`).toBeLessThan(120);
      expect(t.bpm).toBeGreaterThan(0);
    }
  });

  it('gives every track a moment, mood and duration for the UI', () => {
    for (const t of musicTracks) {
      expect(t.title).toBeTruthy();
      expect(t.composer).toBeTruthy();
      expect(t.mood).toBeTruthy();
      expect(t.moment).toBeTruthy();
      expect(t.duration).toMatch(/^\d+:\d{2}$/);
    }
  });

  it('uses a distinct vertical tempo ordering that starts ceremonial', () => {
    expect(musicTracks[0].moment).toBe('Processional & grand entrance');
  });
});

describe('musicCredits', () => {
  it('states the public-domain vs CC-BY split plainly', () => {
    expect(musicCredits.statement).toMatch(/public domain/i);
    expect(musicCredits.statement).toMatch(/Creative Commons Attribution/i);
  });

  it('links the licence and the performer', () => {
    expect(musicCredits.licenseUrl).toMatch(/creativecommons\.org/);
    expect(musicCredits.performerUrl).toMatch(/^https:\/\//);
  });
});
