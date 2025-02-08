import React, { useState, useEffect } from "react";
import NavBar from "../app/components/Header/components/Navbar"
import CookiePolicy from '../app/CookiePolicy/CookiePolicy'
import CookiePolicyMobile from '../app/CookiePolicy/CookiePolicyMobile'
import useDeviceType from '../app/Crowdfunding/components/hooks/useDeviceType';
import Footer from '../app/components/Footer/Footer'
import FooterMobile from '../app/components/Footer/FooterMobile'


const CookiePolicyPage = () => {
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
        <div>
            <NavBar/>
            {isMobile ? <CookiePolicyMobile/> : <CookiePolicy/>}
            {isMobile ? <FooterMobile/> : <Footer/>}
        </div>
    )
}

export default CookiePolicyPage;