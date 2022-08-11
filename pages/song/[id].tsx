import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";

interface songData {
  name: string;
  artist: string;
  img: string;
  url: string;
}

const Song = ({ name, artist, img, url }: songData) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(url);
  return (
    <div className="h-screen w-screen ">
      <Head>
        <title>{id}</title>
        <meta name={name} content={`| ${artist}`} />
        <link rel="icon" href={img} />
      </Head>
      <div className="text-white flex flex-col justify-center items-center h-5/6">
        <img
          height="360px"
          width="360px"
          className="my-4 rounded-xl drop-shadow-2xl"
          src={img}
        ></img>
        <h1 className="text-6xl font-sans my-2 drop-shadow-xl">{name}</h1>
        <h1 className="text-3xl font-thin my-2 drop-shadow-lg">{artist}</h1>
        <a
          className="absolute bottom-4 drop-shadow-xl text-lg flex flex-row items-center justify-center align-middle px-4 py-2 my-2 bg-black rounded-full"
          href={url}
        >
          <img
            height="32px"
            width="32px"
            className="mr-2"
            src="/Spotify_Icon_RGB_Green.png"
          ></img>
          <span className="font-thin">Open on Spotify</span>
        </a>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  console.log(song);

  const data: songData = {
    name: song?.name,
    artist: song?.artists[0]?.name,
    img: song?.album?.images[0]?.url,
    url: song?.external_urls?.spotify,
  };

  return {
    props: { ...data },
  };
};

export default Song;
