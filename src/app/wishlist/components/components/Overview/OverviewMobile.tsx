import React, { useEffect } from 'react';
import StageDescriptionMobile from './components/StageDescriptionMobile';
import Info from './components/Info'
import DonationProgress from './components/components/DonationProgress'


const OverviewMobile = ({ products = [] }) => {


  useEffect(() => {
    console.log('Products:', products);
  }, [products]);
    return (
        <div className="flex flex-col items-center justify-center h-full">
          <div>
            <StageDescriptionMobile />
          </div>
          <DonationProgress/>
          {/* <Info/> */}
        </div>
    );
}

export default OverviewMobile;
