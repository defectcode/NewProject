import React, { useState, useEffect } from "react";
import Static from "../app/components/Header/components/Static";
import HeaderSeriesConcept from '../app/SeriesConcept/HeaderSeriesConcept';
import HeaderSeriesConceptMobile from '../app/SeriesConcept/HeaderSeriesConceptMobile';
import NavBarSeriesConcept from '../app/SeriesConcept/components/NavBarSeriesConcept';
import useDeviceType from '../app/Crowdfunding/components/hooks/useDeviceType';
import ButonShere from '../app/Crowdfunding/components/mobile/ButonShere';
import Rewards from '../app/Crowdfunding/components/components/Rewards/Rewards';
import Community from '../app/Crowdfunding/components/components/Community/Community';
import Extras from '../app/Crowdfunding/components/components/Extras/Extras';
import Overview from '../app/SeriesConcept/components/components/Overview/Overview';
import OverviewMobile from "../app/SeriesConcept/components/components/Overview/OverviewMobile";
import RewardsMobile from "../app/Crowdfunding/components/components/Rewards/RewardsMobile";
import CommunityMobile from "../app/Crowdfunding/components/components/Community/CommunityMobile";
import ExtrasMobile from "../app/Crowdfunding/components/components/Extras/ExtrasMobile";
import Footer from '../app/components/Footer/Footer'
import FooterMobileOverview from '../app/components/Footer/FooterMobileOverview'

const Crowdfunding = () => {
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
        <div className="mb-10 md:mb-0 bg-black h-auto">
            <Static />
            {isMobile ? <HeaderSeriesConceptMobile /> : <HeaderSeriesConcept />}
            <div className="">
            {isMobile ? '' : <NavBarSeriesConcept setActiveSection={setActiveSection} />}
            </div>
            {isMobile ? <ButonShere /> : ''}
            <div>
                {renderSection()}
            </div>
            {isMobile ? <FooterMobileOverview/> : <Footer/>}
        </div>
    );
}

export default Crowdfunding;
