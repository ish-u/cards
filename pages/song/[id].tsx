import Head from "next/head";
import Image from "next/image";
import { GetStaticProps } from "next";
import MarqueeBackground from "../../components/MarqueeBackground";
import { useContext, useState } from "react";
import { AppContext } from "../../context/context";
import { ActionType } from "../../context/reducer";
import { useEffect } from "react";
import { motion, useScroll } from "framer-motion";
const ColorThief = require("colorthief");
import { promises as fs } from "fs";

interface songData {
  name: string;
  artists: {
    name: string;
    id: string;
    img: string;
  }[];
  img: string;
  url: string;
  uri: string;
  album: {
    name: string;
    totalTracks: string;
    trackNumber: string;
    id: string;
    releaseDate: string;
  };
  start: string;
  end: string;
}

const rgbToHex = (colors: number[]) =>
  "#" +
  colors
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

const Song = ({
  name,
  artists,
  img,
  url,
  uri,
  album,
  start,
  end,
}: songData) => {
  const [showArtist, setShowArtist] = useState(false);
  const { scrollY } = useScroll();

  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: ActionType.ChangeColor,
      payload: { startColor: start, endColor: end },
    });
    setShowArtist(artists.length === 1);
    console.log(start, end);
  }, []);

  const play = async (id: string, device_id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/play?id=${id}&device_id=${device_id}`,
      {
        method: "GET",
      }
    );
    console.log(await response.json());
    dispatch({
      type: ActionType.Toggle,
      payload: {
        active: true,
      },
    });
  };

  useEffect(() => {
    if (state.player !== undefined) {
      dispatch({ type: ActionType.Change, payload: { id: uri } });
    }
  }, [state.player]);

  useEffect(() => {
    if (state.device_id !== "" && state.id !== "") {
      play(state.id, state.device_id);
    }
  }, [state.id, state.device_id]);

  return (
    <div className="h-full w-full">
      <Head>
        <title>
          {name +
            " | " +
            artists
              .map((artist) => {
                return artist.name;
              })
              .join(" | ")}
        </title>
        <meta
          name={name}
          content={`| ${artists
            .map((artist) => {
              return artist.name;
            })
            .join(" | ")}`}
        />
        <link rel="icon" href={img} />
      </Head>
      <MarqueeBackground name={name} artists={artists} />
      <div className="text-white flex flex-row h-screen w-screen justify-center flex-wrap">
        <div className="w-full md:w-2/5 flex flex-col items-center justify-center">
          <div className="fixed">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{
                scale: 1.2,
              }}
              whileTap={{
                scale: 0.9,
              }}
            >
              <Image
                height="420px"
                width="420px"
                className="rounded-md drop-shadow-2xl"
                src={img}
                alt={name + artists.forEach((artist) => artist.name)}
              />
            </motion.div>
            {/* <div className="absolute top-0 right-100 text-black ">
              <div className="text-4xl text-bold">
                #{album.trackNumber} / {album.totalTracks}
              </div>
              <div className="text-4xl text-bold">{album.name}</div>
            </div> */}
          </div>
        </div>
        <div className="w-full md:w-2/5 flex flex-col justify-center">
          <div
            className="text-4xl md:text-6xl leading-snug md:leading-snug font-bold my-2 
                         drop-shadow-xl break-words w-3/5 md:w-full m-auto"
          >
            {name}
          </div>
          <div className="text-xl md:text-2xl w-3/5 md:w-full justify-center md:justify-start font-thin my-2 drop-shadow-lg break-words flex flex-wrap">
            {artists.map((artist) => {
              return (
                <motion.div
                  key={artist.id}
                  className={`flex ${
                    showArtist &&
                    "w-3/5 md:w-full justify-center md:justify-start"
                  } my-2 mr-2`}
                >
                  <motion.div whileHover={{ scale: !showArtist ? 1.5 : 1 }}>
                    <Image
                      onClick={() => setShowArtist(!showArtist)}
                      height="36px"
                      width="36px"
                      className="rounded-full drop-shadow-2xl"
                      src={artist.img}
                      alt={name + artists.forEach((artist) => artist.name)}
                    />
                  </motion.div>

                  {showArtist && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ ease: "linear" }}
                      className="ml-2 handle"
                    >
                      <a href={`https://open.spotify.com/artist/${artist.id}`}>
                        {artist.name}
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <a
        className="text-white fixed bottom-8 drop-shadow-xl text-lg flex flex-row items-center justify-center align-middle px-4 py-2 my-2 bg-black rounded-full"
        href={url}
      >
        <Image
          height="32px"
          width="32px"
          src="/Spotify_Icon_RGB_Green.png"
          alt="Spotify Logo"
        ></Image>
        <span className="font-thin ml-2">Open on Spotify</span>
      </a> */}
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
    artists: [],
    img: song?.album?.images[0]?.url,
    url: song?.external_urls?.spotify,
    uri: id as string,
    album: {
      name: song?.album?.name,
      totalTracks: song?.album?.total_tracks,
      trackNumber: song?.track_number,
      id: song?.album?.id,
      releaseDate: song?.album?.release_date,
    },
    start: "",
    end: "",
  };

  if (song?.artists?.length) {
    for (let i = 0; i < song?.artists?.length; i++) {
      const artist = await fetch(
        `https://api.spotify.com/v1/artists/${song?.artists[i]?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        }
      );

      const artistData = await artist.json();

      data.artists.push({
        name: artistData?.name,
        id: artistData?.id,
        img: artistData?.images[0].url,
      });
    }
  }

  const imageData = await fetch(data.img);
  const buffer = await imageData.buffer();
  const file = await fs.writeFile("./image.jpg", buffer);
  const colorPalette = await ColorThief.getPalette("./image.jpg", 2);
  data.start = rgbToHex(colorPalette[0]);
  data.end = rgbToHex(colorPalette[1]);
  // await fs.writeFile(`./image.jpg`, buffer, async () => {
  //   console.log("finished downloading!");
  //   const img = "./image.jpg";

  //   await ColorThief.getPalette(img, 5)
  //     .then((palette) => {
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });

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
