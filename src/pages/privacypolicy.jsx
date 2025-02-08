import React, { useState, useEffect } from "react";
import NavBar from "../app/components/Header/components/Navbar"
import PrivacyPolicy from '../app/PrivacyPolicy/PrivacyPolicy'
import PrivacyPolicyMobile from '../app/PrivacyPolicy/PrivacyPolicyMobile'
import useDeviceType from '../app/Crowdfunding/components/hooks/useDeviceType';
import Footer from '../app/components/Footer/Footer'
import FooterMobile from '../app/components/Footer/FooterMobile'


const PrivacyPolicyPage = () => {
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
            {isMobile ? <PrivacyPolicyMobile/> : <PrivacyPolicy/>}
            {isMobile ? <FooterMobile/> : <Footer/>}
        </div>
    )
}

export default PrivacyPolicyPage;