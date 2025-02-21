import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";


const Success = () => {
  return (
    <>
      <Head>
        <title>Success - Thank You!</title>
      </Head>
      <div className="h-screen bg-[#252525] flex flex-col justify-center items-center text-center p-5 font-ekMukta">
        <div className="flex flex-col items-center">
          <Image src="/imgs/pages/Success.svg" alt="success" width={60} height={50} />
          <h1 className="text-[#FFFFFF] text-[24px] font-extrabold mt-[30px] mb-4 leading-[1]">Thank you! </h1>
          <p className="text-[#FFFFFF] text-[16px] font-extralight mb-10">
            Your payment was processed successfully.You`ll receive a receipt by email shortly.
          </p>
          <Link legacyBehavior href="/" >
            <button className="bg-[#F5F5F7] text-[#1E1E1E] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300">
              Go Back Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;
