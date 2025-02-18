import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { MdErrorOutline } from "react-icons/md";


const Error = () => {
  return (
    <>
      <Head>
        <title>Error - Something Went Wrong</title>
      </Head>
      <div className="h-screen bg-[#252525] flex flex-col justify-center items-center text-center p-5">
        <div className="flex flex-col items-center">
          <Image src="/imgs/pages/Error.svg" alt="success" width={59} height={59} />
          
          <h2 className="text-[#FFFFFF] text-[24px] font-extrabold mt-[30px] mb-4">Sory, Name!</h2>
          <p className="text-gray-400 text-xl mb-8">
            Your payment was not processed.<br/>Try again later!
          </p>
          <Link legacyBehavior href="/">
            <a className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300">
              Go Back Home
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
