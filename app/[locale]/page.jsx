import Toolbar from '@mui/material/Toolbar';
import Header from '@/components/StickyHeader';
import Hero from '@/components/Hero';
import Main from '@/components/Main';
import Footer from '@/components/Footer';
import ImageList from '@/components/ImageList';
// import BackToTop from '@/components/BackToTop';

export default function LocalePage() {
  return (
    <>
      <Header />
      <Toolbar />
      {/* <Toolbar id="back-to-top-anchor" /> */}
      <Main className="pb-24">
        <Hero />
        <ImageList />
      </Main>
      {/* <BackToTop triggerId="back-to-top-anchor" /> */}
      <Footer />
    </>
  );
}
