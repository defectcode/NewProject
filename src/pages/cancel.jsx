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
      <div className="h-screen bg-gray-900 flex flex-col justify-center items-center text-center p-5">
        <div className="flex flex-col items-center">
          <FaCheckCircle
            alt="Success"
            width={300}
            height={300}
            className="mb-8 w-32 h-auto"
          />
          <h1 className="text-green-500 text-6xl font-bold mb-4">Thank You!</h1>
          <p className="text-gray-400 text-xl mb-8">
            Your transaction was successful. We appreciate your support.
          </p>
          <Link legacyBehavior href="/">
            <a className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300">
              Go Back Home
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;
