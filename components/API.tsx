import Link from "next/link";

const API = () => {
  return (
    <div className="px-8 py-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-2">go to</h1>
      <h1 className="text-2xl sm:text-4xl font-mono underlined break-words">
        /song/:SpotifyTrackID
      </h1>
      <div className="flex flex-col pt-6">
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
  );
};

export default API;
