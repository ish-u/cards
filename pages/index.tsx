import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>cards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen h-96 flex flex-col align-middle justify-center items-center">
        <div>
          <h1 className="text-5xl  font-mono underlined">
            go to /song/:SpotifyTrackID
          </h1>
          <div className="flex flex-col pt-12">
            <span className="text-xl font-bold">Examples</span>
            <span className="font-mono pt-4 text-lg hover:underline">
              <Link href="/song/1aOxOpH4AkGAd8OMrKjyNY">
                /song/1aOxOpH4AkGAd8OMrKjyNY
              </Link>
            </span>
            <span className="font-mono pt-4 text-lg hover:underline">
              <Link href="/song/6drjmuBGalsmDjMSi7BFAP">
                /song/6drjmuBGalsmDjMSi7BFAP
              </Link>
            </span>
            <span className="font-mono pt-4 text-lg hover:underline">
              <Link href="/song/7KVA9XflawdJaRBd1XYkJu">
                /song/7KVA9XflawdJaRBd1XYkJu
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
