import React from 'react';
import Navbar from '../app/components/Header/components/Navbar'
import Image from 'next/image';

const Interactive = () => {
    return (
        <div>
            <Navbar/>
            <div id="rewards" className={`rewardsContainer relative`}>
            <div className='overlay'></div>
            <div className='content'>
                <div className='iconWrapper'>
                    <Image src="/imgs/Crowdfunding/Community/progress.svg" alt="Work In Progress Icon" width={1} height={1} />
                </div>
            </div>
        </div>
        </div>
    );
}

export default Interactive;