import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next";
import MarqueeBackground from "../../components/MarqueeBackground";
interface songData {
  name: string;
  artist: string;
  img: string;
  url: string;
}

const Song = ({ name, artist, img, url }: songData) => {
  return (
    <div className="h-screen w-screen">
      <Head>
        <title>{name + " | " + artist}</title>
        <meta name={name} content={`| ${artist}`} />
        <link rel="icon" href={img} />
      </Head>
      <MarqueeBackground name={name} artist={artist} />
      <div className="text-white flex flex-row h-5/6 justify-center">
        <div className="w-2/5 flex flex-col items-center justify-center">
          <Image
            height="360px"
            width="360px"
            className="my-4 rounded-xl drop-shadow-2xl"
            src={img}
          />
        </div>
        <div className="w-2/5 flex flex-col justify-center">
          <h1 className="text-6xl leading-snug font-sans font-bold my-2 drop-shadow-xl break-words">
            {name}
          </h1>
          <h1 className="text-4xl font-thin my-2 drop-shadow-lg break-words">
            - {artist}
          </h1>
        </div>
        <a
          className="absolute bottom-8 drop-shadow-xl text-lg flex flex-row items-center justify-center align-middle px-4 py-2 my-2 bg-black rounded-full"
          href={url}
        >
          <Image
            height="32px"
            width="32px"
            className="mr-2"
            src="/Spotify_Icon_RGB_Green.png"
            alt="Spotify Logo"
          ></Image>
          <span className="font-thin">Open on Spotify</span>
        </a>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;

  // fetch access token
  var res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
      Accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }).toString(),
  });
  const token = (await res.json())?.access_token;

  var res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  });

  const song = await res.json();

  const data: songData = {
    name: song?.name,
    artist: song?.artists[0]?.name,
    img: song?.album?.images[0]?.url,
    url: song?.external_urls?.spotify,
  };

  console.log(data);

  return {
    props: {
      ...data,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Song;
