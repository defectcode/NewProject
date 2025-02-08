import React, { useEffect } from 'react';
import StageDescriptionMobile from './components/StageDescriptionMobile';
// import DetailedStepsMobile from './components/DetailedStepsMobile';
import FundingBreakdownMobile from './components/FundingBreakdownMobile';
import { useSearchParams } from 'next/navigation';


const OverviewMobile = ({ products = [] }) => {

  const searchParams = useSearchParams();
  const searchTerm = searchParams?.get('searchTerm');




  useEffect(() => {
    console.log('Products:', products);
  }, [products]);
    return (
        <div className="flex flex-col items-center justify-center">
                <div>
                  <StageDescriptionMobile />
                  <FundingBreakdownMobile />
                </div>

        </div>
    );
}

export default OverviewMobile;
