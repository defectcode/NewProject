import React from 'react';
import Navbar from '../app/components/Header/components/Navbar'

const Careers = () => {
    return (
        <div>
            <Navbar/>
            <div id="rewards" className={`rewardsContainer relative`}>
            <div className='overlay'></div>
            <div className='content'>
                <div className='iconWrapper'>
                    <img src="/imgs/Crowdfunding/Community/progress.svg" alt="Work In Progress Icon" />
                </div>
            </div>
        </div>
        </div>
    );
}

export default Careers;