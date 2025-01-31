import React, { useState, useEffect, useRef } from "react";
import Static from "../app/components/Header/components/Static";
import StaticMobile from "../app/components/Header/components/StaticMobile";
import HeaderCrowdfunding from '../app/Crowdfunding/HeaderCrowdfunding';
import HeaderCrowdfundingMobile from '../app/Crowdfunding/HeaderCrowdfundingMobile';
import NavBarCrowdfunding from '../app/Crowdfunding/components/NavBarCrowdfunding';
import useDeviceType from '../app/Crowdfunding/components/hooks/useDeviceType';
import Rewards from '../app/Crowdfunding/components/components/Rewards/Rewards';
import Community from '../app/Crowdfunding/components/components/Community/Community';
import Extras from '../app/Crowdfunding/components/components/Extras/Extras';
import Overview from '../app/Crowdfunding/components/components/Overview/Overview';
import OverviewMobile from "../app/Crowdfunding/components/components/Overview/OverviewMobile";
import RewardsMobile from "../app/Crowdfunding/components/components/Rewards/RewardsMobile";
import CommunityMobile from "../app/Crowdfunding/components/components/Community/CommunityMobile";
import ExtrasMobile from "../app/Crowdfunding/components/components/Extras/ExtrasMobile";
import Footer from '../app/components/Footer/Footer';
import FooterMobileOverview from '../app/components/Footer/FooterMobileOverview';
import NavBarCrowdfundingMobile from '../app/Crowdfunding/components/mobile/NavBarCrowdfundingMobile.jsx';

const Crowdfunding = () => {
    const isMobile = useDeviceType();
    const [activeSection, setActiveSection] = useState('overview');
    const headerRef = useRef(null);
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);

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

    // Logica pentru afișarea barei de navigare după ce 100px din Header a fost ascuns
    useEffect(() => {
        const handleScroll = () => {
            if (headerRef.current) {
                const headerTop = headerRef.current.getBoundingClientRect().top;

                // Verificăm dacă 100px din header este ascuns
                if (headerTop <= -100) {
                    setIsNavBarVisible(true); // Bara de navigare devine vizibilă
                } else {
                    setIsNavBarVisible(false); // Bara de navigare dispare
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const renderSection = () => {
        switch (activeSection) {
            case 'overview':
                return isMobile ? <OverviewMobile /> : <Overview />;
            case 'rewards':
                return isMobile ? <RewardsMobile /> : <Rewards />;
            case 'community':
                return isMobile ? <CommunityMobile /> : <Community />;
            case 'extras':
                return isMobile ? <ExtrasMobile /> : <Extras />;
            default:
                return isMobile ? <OverviewMobile /> : <Overview />;
        }
    };

    return (
        <div className="lg:mb-0 bg-black h-auto">
            {/* Ref pentru componenta HeaderCrowdfundingMobile */}
            {isMobile ? (
                <>
                    <div ref={headerRef}>
                        <StaticMobile />
                        <HeaderCrowdfundingMobile />
                    </div>
                    <div>
                        {renderSection()}
                        <FooterMobileOverview />
                    </div>
                </>
            ) : (
                <>
                    <Static />
                    <HeaderCrowdfunding />
                    <NavBarCrowdfunding setActiveSection={setActiveSection} />
                    {renderSection()}
                    <Footer />
                </>
            )}
            
            {/* NavBarCrowdfundingMobile este afișată doar dacă 100px din Header este ascuns */}
            {isNavBarVisible && isMobile && (
                <div className="fixed top-0 left-0 right-0 z-50" style={{ zIndex: 999 }}>
                    {/* <NavBarCrowdfundingMobile setActiveSection={setActiveSection} /> */}
                </div>
            )}
        </div>
    );
};

export default Crowdfunding;
