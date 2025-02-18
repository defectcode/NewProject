'use client'
import { useMediaQuery } from 'react-responsive';

const useDeviceType = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
    return isMobile;
}

export default useDeviceType;
