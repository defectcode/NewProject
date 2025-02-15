import Image from "next/image";
import Link from "next/link";
// import ShareBottonNavBar from '/src/app/SeriesConcept/components/mobile/Share/ShareButton'

export default function NavBarCrowd() {
    console.log("✅ NavBarCrowd is rendered!");

    return (
        <div className="top-0 left-0 w-full bg-black bg-opacity-50 flex items-center justify-between py-5 z-[100] px-5 border border-red-500">
            <Link href='/'>
                <Image src="/imgs/Crowdfunding/Valery Fain.svg" alt="logo" width={83} height={14} />
            </Link>
        </div>
    );
}
