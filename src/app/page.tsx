'use client'
import Carousel from "./components/Carousel/Carousel";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import OurMission from './components/OurMission/OurMission';
import OurTeam from './components/OurTeam/OurTeam';
import { useEffect, useState } from "react";
import useDeviceType from '../app/Crowdfunding/components/hooks/useDeviceType';
import FooterMobile from '../app/components/Footer/FooterMobile'
import CarouselMobile from './components/Carousel/CarouselMobile'


export default function Home() {

  const isMobile = useDeviceType();
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
      if (window.location.hash) {
          setActiveSection(window.location.hash.substring(1));
      }

      const handleHashChange = () => {
          setActiveSection(window.location.hash.substring(1));
      };

      window.addEventListener('hashchange', handleHashChange);
      return () => {
          window.removeEventListener('hashchange', handleHashChange);
      };
  }, []);

  return (
    <main>
      <Header/>
      {/* {isMobile ? <CarouselMobile/>  :  <Carousel/>}
      <OurMission/>
      <OurTeam/>
      {isMobile ? <FooterMobile/> : <Footer/>} */}
    </main>
  );
}
