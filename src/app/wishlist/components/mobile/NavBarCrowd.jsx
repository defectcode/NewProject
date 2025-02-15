import Image from "next/image";
import Link from "next/link";
import ShareBottonNavBar from '/src/app/SeriesConcept/components/mobile/Share/ShareBottonNavBar'

export default function NavBarCrowd() {
    return (
        <div className="top-0 left-0 w-full bg-transparent flex items-center justify-between py-5 z-50 px-5">
            <Link href='/'>
                <Image src="/imgs/Crowdfunding/Valery Fain.svg" alt="logo" width={83} height={14} />
            </Link>
            <ShareBottonNavBar/>
        </div>
    );
}
