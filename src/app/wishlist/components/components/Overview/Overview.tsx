'use client';
import React, { useState, useMemo, useEffect } from 'react';
import StageDescription from './components/StageDescription';
import FundingBreakdown from './components/FundingBreakdown';



const Overview = ({ products = [] }) => {
  const [filters, setFilters] = useState({});

  // const searchParams = useSearchParams();
	// const searchTerm = searchParams?.get('searchTerm');




  useEffect(() => {
    console.log('Products:', products);
  }, [products]);

  return (
    
    <div className="flex flex-col items-center justify-center w-full bg-[#000000] py-8">
      <div className="flex max-w-[1200px] w-full bg-[#000000]">
        <div className="w-2/3">
          <StageDescription />
        </div>
        <div className="w-1/3">
          <FundingBreakdown />
        </div>
      </div>
      
    </div>
  );
};

export default Overview;
