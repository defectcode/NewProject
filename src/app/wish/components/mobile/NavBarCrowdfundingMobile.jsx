
'use client'

import React, { useState, useEffect, useRef } from "react";

const NavBarCrowdfundingMobile = ({ setActiveSection, activeSection }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0); 
    const navbarRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.pageYOffset;

            if (currentScrollY > lastScrollY && currentScrollY > 700) {
                setIsVisible(true); 
            } else if (currentScrollY < lastScrollY && currentScrollY < 100) {
                setIsVisible(false); 
            }

            setLastScrollY(currentScrollY); 
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

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
        <div className="">
            <div
                ref={navbarRef}
                id="navbar-mobile-original"
                className={`fixed top-0 left-0 right-0 bg-[#000000] transition-transform duration-500 ease-in-out ${
                    isVisible ? "translate-y-0" : "-translate-y-full"
                } z-50`} 
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

export default NavBarCrowdfundingMobile;
