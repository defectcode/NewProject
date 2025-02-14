
'use client'
import React, { useRef } from "react";

const NavBarCrowdfunding = ({ setActiveSection, activeSection }) => {
    const navbarRef = useRef(null);

    const handleClick = (section) => {
        setActiveSection(section); 
    };

    const linkClasses = (section) => {
        const baseClasses = "px-1 py-[11px] text-[14px] flex justify-center items-center w-full relative";
        const activeClasses = 'text-[#FFFFFF] border-b-[1.5px] border-[#FFFFFF] font-avenir-heavy after:absolute after:content-[""] after:h-[1px] after:w-full after:left-0 after:bottom-[3px]';
        const inactiveClasses = "text-[#979797] border-b-4 border-transparent font-avenir";

        return `${baseClasses} ${activeSection === section ? activeClasses : inactiveClasses}`;
    };

    return (
        <div className="bg-[#1B1B1B] fixed w-full z-[999]">
            <div
                ref={navbarRef}
                id="navbar-mobile-original"
                className={`transition-transform duration-500 ease-in-out z-50`} 
            >
                <div className="flex items-center justify-center h-[60px]">
                    <div className="flex items-center justify-center gap-[30px] w-full px-5">
                        <button
                            className={linkClasses("overview")}
                            onClick={() => handleClick("overview")}
                        >
                            Overview
                        </button>
                        <button
                            className={linkClasses("rewards")}
                            onClick={() => handleClick("rewards")}
                        >
                            Rewards
                        </button>
                        <button
                            className={linkClasses("community")}
                            onClick={() => handleClick("community")}
                        >
                            Community
                        </button>
                        <button
                            className={linkClasses("extras")}
                            onClick={() => handleClick("extras")}
                        >
                            Extras
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBarCrowdfunding;
