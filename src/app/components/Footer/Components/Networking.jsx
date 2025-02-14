import React from "react";
import Image from "next/image";
import Link from "next/link";

const Networking = () => {
    return (
        <div className="w-full max-lg:h-auto mt-14 max-md:mt-5 rounded-xl flex flex-col lg:flex-row items-center justify-between mb-10">
            <div className="flex gap-10 text-[#] items-center">
                <Link href='https://tiktok.com/@valery.fain14'>
                    <Image 
                        src='/imgs/Crowdfunding/Footer/Tiktok.svg' 
                        alt="tiktok" 
                        width={20} 
                        height={20} 
                    />
                </Link>
                <Link href='https://instagram.com/valery.fain'>
                    <Image 
                        src='/icons/Instagram.svg' 
                        alt="instagram" 
                        width={20} 
                        height={20} 
                    />
                </Link>
                <Link href='https://www.youtube.com/'>
                    <Image 
                        src='/icons/Youtube.svg' 
                        alt="youtube" 
                        width={20} 
                        height={20} 
                    />
                </Link>
                <Link href='https://x.com/'>
                    <Image 
                        src='/icons/X.svg' 
                        alt="twitter" 
                        width={20} 
                        height={20} 
                    />
                </Link>
                <Link href='https://facebook.com/ValreyFine'>
                    <Image 
                        src='/icons/Facebook.svg' 
                        alt="facebook" 
                        width={13} 
                        height={13} 
                    />
                </Link>
            </div>
        </div>
    )
}

export default Networking;
