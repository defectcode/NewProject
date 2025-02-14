import React from 'react';
import StageDescriptionMobile from './components/StageDescriptionMobile';
import FundingBreakdownMobile from './components/FundingBreakdownMobile';

const OverviewMobile = ({ setActiveSection, activeSection }) => {
    return (
        <div className="">
            <StageDescriptionMobile 
                setActiveSection={setActiveSection} 
                activeSection={activeSection} 
            />
            <FundingBreakdownMobile />
        </div>
    );
}

export default OverviewMobile;
