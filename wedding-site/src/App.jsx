import Header from './components/Header';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import SaveTheDate from './components/SaveTheDate';
import Programme from './components/Programme';
import Colours from './components/Colours';
import Gifts from './components/Gifts';
import FAQ from './components/FAQ';
import RSVP from './components/RSVP';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import StickyRSVPBar from './components/StickyRSVPBar';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  return (
    <div className="bg-transparent min-h-screen text-brand-espresso font-sans">
      {/* Floral invitation backdrop, painted behind everything. */}
      <div className="site-backdrop" aria-hidden="true" />
      <Header />
      <Hero />
      <Countdown />
      <SaveTheDate />
      <Programme />
      <Colours />
      <Gifts />
      <FAQ />
      <RSVP />
      <Gallery />
      <Footer />
      <StickyRSVPBar />
      <MusicPlayer />
    </div>
  );
}
