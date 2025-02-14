


import React from "react";
import styles from "./style/DesktopWorkPage.module.css";
import Image from "next/image";

export default function DesktopWorkPage() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <Image src='/imgs/Other/gear.svg' alt="gear" width={61} height={61}/>
            <div className="font-ekMukta text-[#979797] mt-5 text-[24px]">
                We work in the PC version, now available on mobile.
            </div>
        </div>
    );
}
