"use client"
import React, { useState } from "react";
import HeaderCrowdfunding from './HeaderCrowdfunding';
import HeaderCrowdfundingMobile from './HeaderCrowdfundingMobile';
import Rewards from './components/components/Rewards/Rewards';
import Community from './components/components/Community/Community';
import Extras from './components/components/Extras/Extras';
import Overview from './components/components/Overview/Overview';
import OverviewMobile from './components/components/Overview/OverviewMobile';
import RewardsMobile from './components/components/Rewards/RewardsMobile';
import CommunityMobile from './components/components/Community/CommunityMobile';
import ExtrasMobile from './components/components/Extras/ExtrasMobile';
import NavBarCrowdfundingMobile from "./components/mobile/NavBarCrowdfundingMobile";
import NavBarCrowdfundingMobileStatic from "./components/mobile/NavBarCrowdfundingMobileStatic";
import NavBarCrowdfunding from "./components/NavBarCrowdfunding";
import useDeviceType from './components/hooks/useDeviceType';
import Footer from "../components/Footer/Footer";
import FooterMobile from "../components/Footer/FooterMobile";
import DesktopWorkPage from "./DesktopWorkPage"

export default function Crowdfunding() {
    const isMobile = useDeviceType();
    const [activeSection, setActiveSection] = useState('overview');

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
        <div className="h-auto bg-[#000000]">
            {isMobile && activeSection === 'overview' && <HeaderCrowdfundingMobile activeSection={activeSection} setActiveSection={setActiveSection} />}
            {/* {!isMobile && activeSection === 'overview' && <HeaderCrowdfunding />} */}
            
            {['rewards', 'community', 'extras'].includes(activeSection) && (
            <NavBarCrowdfunding
                setActiveSection={setActiveSection}
                activeSection={activeSection}
            />
        )}


            {isMobile ? (
                <div>
                    <NavBarCrowdfundingMobile 
                        setActiveSection={setActiveSection} 
                        activeSection={activeSection} 
                    />
                </div>
                ) : (
                    null
                )
            }
            {isMobile ? <div>{renderSection()}</div> : <DesktopWorkPage/>}
            {isMobile && activeSection != 'rewards' && activeSection != 'community' && activeSection != 'extras' ? <FooterMobile/> : null}
        </div>
    );
}
