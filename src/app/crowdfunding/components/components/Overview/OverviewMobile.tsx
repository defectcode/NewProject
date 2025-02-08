'use client';
import React, { Suspense, useEffect } from 'react';
import StageDescriptionMobile from './components/StageDescriptionMobile';
// import DetailedStepsMobile from './components/DetailedStepsMobile';
import { useSearchParams } from 'next/navigation';
import FundingBreakdownMobile from './components/FundingBreakdownMobile';
import Info from './components/Info'


const OverviewMobile = ({ products = [] }) => {

  const searchParams = useSearchParams();
  const searchTerm = searchParams?.get('searchTerm');




  useEffect(() => {
    console.log('Products:', products);
  }, [products]);
    return (
      <Suspense>
        <div className="flex flex-col items-center justify-center h-full">
          <div>
            <StageDescriptionMobile />
            <FundingBreakdownMobile />
          </div>
          <Info/>
        </div>
      </Suspense>
       
    );
}

export default OverviewMobile;
