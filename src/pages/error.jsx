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
      <div className="h-screen bg-gray-900 flex flex-col justify-center items-center text-center p-5">
        <div className="flex flex-col items-center">
          <MdErrorOutline
            alt="Error"
            width={300}
            height={300}
            className="mb-8 w-32 h-auto"
          />
          <h1 className="text-white text-6xl font-bold mb-4">Oops!</h1>
          <p className="text-gray-400 text-xl mb-8">
            Something went wrong. Please try again later.
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
