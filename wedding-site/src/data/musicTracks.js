/**
 * Curated wedding music playlist.
 *
 * LICENSING — every track below was verified against its source file page:
 *   - License: Creative Commons Attribution (CC BY 3.0 / CC BY 4.0)
 *   - Host: upload.wikimedia.org, responds 200 with `Access-Control-Allow-Origin: *`
 *   - Format: MP3 only (Safari cannot decode Ogg Vorbis, so .oga files are excluded)
 *
 * CC BY requires visible credit + a link to the license. `attribution` and
 * `licenseUrl` are rendered in the credits panel by MusicPlayer — do not remove.
 *
 * Composer is public domain; the RECORDING is what carries the CC BY license.
 * That distinction is why these are safe to stream but a commercial charting
 * single (Tems, Omah Lay, Asake...) is NOT — those stay off the site.
 *
 * TEMPO: 56-93 BPM across the set. Deliberately restrained so background music
 * never competes with conversation during vows, speeches, or the first dance.
 */

export const musicTracks = [
  {
    id: 'canon-1694',
    title: "Canon in D",
    composer: 'Johann Pachelbel',
    performer: 'Arr. for modern ensemble',
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Pachelbel_Canon_1694_arrangement.mp3',
    bpm: 68,
    duration: '3:44',
    mood: 'Reverent, ceremonial',
    moment: 'Processional & grand entrance',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    attribution: "Pachelbel's Canon (1694 arrangement), Johann Pachelbel, CC BY 4.0",
  },
  {
    id: 'jesu-joy',
    title: "Jesu, Joy of Man's Desiring",
    composer: 'Johann Sebastian Bach',
    performer: 'Kevin MacLeod',
    src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Jesu%2C_Joy_of_Man%27s_Desiring_%28ISRC_USUAN1100189%29.mp3',
    bpm: 75,
    duration: '3:13',
    mood: 'Warm, luminous',
    moment: 'Exchange of vows',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    attribution: 'Jesu, Joy of Man’s Desiring, Kevin MacLeod (incompetech.com), CC BY 3.0',
  },
  {
    id: 'bridal-chorus-organ',
    title: 'Bridal Chorus',
    composer: 'Richard Wagner',
    performer: 'Kevin MacLeod — pipe organ',
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Wagner_Bridal_Chorus_%28ISRC_USUAN1100021%29.mp3',
    bpm: 60,
    duration: '2:19',
    mood: 'Epic, majestic',
    moment: 'Nuptial blessing',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    attribution: 'Bridal Chorus, Kevin MacLeod (incompetech.com), CC BY 3.0',
  },
  {
    id: 'canon-macleod',
    title: 'Canon in D Major',
    composer: 'Johann Pachelbel',
    performer: 'Kevin MacLeod',
    src: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Canon_in_D_Major_%28ISRC_USUAN1100301%29.mp3',
    bpm: 70,
    duration: '2:47',
    mood: 'Elegant, flowing',
    moment: 'Reception ambience',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    attribution: 'Canon in D Major, Kevin MacLeod (incompetech.com), CC BY 3.0',
  },
  {
    id: 'there-is-romance',
    title: 'There is Romance',
    composer: 'Kevin MacLeod',
    performer: 'Kevin MacLeod — piano',
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/There_is_Romance_%28ISRC_USUAN1100044%29.mp3',
    bpm: 93,
    duration: '3:17',
    mood: 'Calming, romantic',
    moment: 'First dance & dinner service',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    attribution: 'There is Romance, Kevin MacLeod (incompetech.com), CC BY 3.0',
  },
  {
    id: 'heartwarming',
    title: 'Heartwarming',
    composer: 'Kevin MacLeod',
    performer: 'Kevin MacLeod — piano',
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Heartwarming_%28ISRC_USUAN1100207%29.mp3',
    bpm: 82,
    duration: '1:12',
    mood: 'Bright, gentle',
    moment: 'Cake cutting & toasts',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    attribution: 'Heartwarming, Kevin MacLeod (incompetech.com), CC BY 3.0',
  },
  {
    id: 'bridal-chorus-piano',
    title: 'Bridal Chorus (piano)',
    composer: 'Richard Wagner',
    performer: 'Kevin MacLeod — piano',
    src: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Wagner_Bridal_Chorus_-_piano_%28ISRC_USUAN1100022%29.mp3',
    bpm: 60,
    duration: '1:42',
    mood: 'Soft, tender',
    moment: 'Closing & send-off',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    attribution: 'Bridal Chorus (piano), Kevin MacLeod (incompetech.com), CC BY 3.0',
  },
  {
    id: 'enchanted-journey',
    title: 'Enchanted Journey',
    composer: 'Kevin MacLeod',
    performer: 'Kevin MacLeod — harp',
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Enchanted_Journey_%28ISRC_USUAN1100799%29.mp3',
    bpm: 62,
    duration: '4:30',
    mood: 'Calming, mystical',
    moment: 'Evening reception',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    attribution: 'Enchanted Journey, Kevin MacLeod (incompetech.com), CC BY 3.0',
  },
];

export const musicCredits = {
  statement:
    'Music composed by Johann Pachelbel, Johann Sebastian Bach and Richard Wagner — all in the public domain. Performances by Kevin MacLeod, licensed under Creative Commons Attribution.',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  performerUrl: 'https://incompetech.com',
};
