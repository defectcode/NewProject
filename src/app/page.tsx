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
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  useEffect(() => {
    router.push("/wishlist")
  }, [])


  return null
}
