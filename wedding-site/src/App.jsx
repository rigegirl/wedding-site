import Header from './components/Header';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import SaveTheDate from './components/SaveTheDate';
import Programme from './components/Programme';
import Colours from './components/Colours';
import Gifts from './components/Gifts';
import Wishlist from './components/Wishlist';
import FAQ from './components/FAQ';
import RSVP from './components/RSVP';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import StickyRSVPBar from './components/StickyRSVPBar';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  return (
    <div className="bg-brand-cream min-h-screen text-brand-espresso font-sans">
      <Header />
      <Hero />
      <Countdown />
      <SaveTheDate />
      <Programme />
      <Colours />
      <Gifts />
      <Wishlist />
      <FAQ />
      <RSVP />
      <Gallery />
      <Footer />
      <StickyRSVPBar />
      <MusicPlayer />
    </div>
  );
}
