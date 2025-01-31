import React, { useState, useEffect, useRef } from "react";

const NavBarCrowdfundingMobile = ({ setActiveSection }) => {
    const [activeHash, setActiveHash] = useState('');
    const [isSticky, setIsSticky] = useState(false);
    const [showDuplicate, setShowDuplicate] = useState(false);
    const navbarRef = useRef(null);
    const duplicateNavbarRef = useRef(null);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash || '#overview';
            setActiveHash(hash);
            setActiveSection(hash.substring(1));
        };

        const handleScroll = () => {
            const navbar = navbarRef.current;
            const currentScrollPos = window.pageYOffset;

            if (navbar) {
                const navbarTop = navbar.offsetTop;

                if (currentScrollPos > navbarTop && !isSticky) {
                    setIsSticky(true);
                    setShowDuplicate(true);
                } else if (currentScrollPos <= navbarTop && isSticky) {
                    setIsSticky(false);
                    setShowDuplicate(false);
                }
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('scroll', handleScroll);

        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isSticky, setActiveSection]);

    const handleClick = (hash) => {
        window.location.hash = hash;
        setActiveHash(hash);
        setActiveSection(hash.substring(1));
    };

    const linkClasses = (hash) => {
        const baseClasses = 'px-1 py-[6px] text-[14px] flex justify-center items-center mt-2 w-full relative';
        const activeClasses = 'text-[#F1F1F1] font-avenir-heavy after:absolute after:content-[""] after:bg-[#F1F1F1] after:h-[1px] after:w-full after:left-0 after:bottom-[-9px]';
        const inactiveClasses = 'text-[#979797] border-b-4 border-transparent font-avenir';
    
        return `${baseClasses} ${activeHash === hash ? activeClasses : inactiveClasses}`;
    };
    

    return (
        <div className="">
            <div 
                ref={navbarRef}
                id="navbar-mobile-original" 
                className="relative bg-black"
            >
                <div className="flex items-center justify-center h-[60px]">
                    <div className="flex items-center justify-center gap-[30px] w-full px-5">
                        <a className={linkClasses('#overview')} onClick={() => handleClick('#overview')}>Overview</a>
                        <a className={linkClasses('#rewards')} onClick={() => handleClick('#rewards')}>Rewards</a>
                        <a className={linkClasses('#community')} onClick={() => handleClick('#community')}>Community</a>
                        <a className={linkClasses('#extras')} onClick={() => handleClick('#extras')}>Extras</a>
                    </div>
                </div>
            </div>
            {showDuplicate && (
                <div 
                    ref={duplicateNavbarRef}
                    id="navbar-mobile-duplicate" 
                    className={`fixed top-0 left-0 right-0 z-50 bg-[#1B1B1B] shadow-lg transition-opacity duration-300 ${
                        isSticky ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div className="flex items-center justify-center h-[60px]">
                        <div className="flex items-center justify-center gap-[30px] w-full px-5">
                            <a className={linkClasses('#overview')} onClick={() => handleClick('#overview')}>Overview</a>
                            <a className={linkClasses('#rewards')} onClick={() => handleClick('#rewards')}>Rewards</a>
                            <a className={linkClasses('#community')} onClick={() => handleClick('#community')}>Community</a>
                            <a className={linkClasses('#extras')} onClick={() => handleClick('#extras')}>Extras</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBarCrowdfundingMobile;
