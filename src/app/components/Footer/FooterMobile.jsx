import Link from 'next/link';
import Networking from "./Components/Networking";


export default function FooterMobile() {

  return (
    <div className="bg-[#000000] text-white px-5 w-full max-w-md mx-auto h-auto pb-20">
      <Networking />

      <ul className="text-[#979797] text-[14px] font-ekMukta flex items-center justify-center px-5 gap-5">
        <li><Link legacyBehavior href="/privacypolicy">Privacy Policy</Link></li>
        <li><Link legacyBehavior href="/cookiepolicy">Cookie Policy</Link></li>
        <li><Link legacyBehavior href="/terms">Tearm of Use</Link></li>
      </ul>

      <div className="mb-5 mt-5">
        <p className="text-white text-[16px] text-center max-md:text-[10px] font-ekmukta-extralight">
            Copyright © 2024 Fynely S.R.L. All right reserved.
        </p>
      </div>

    </div>
  );
}
