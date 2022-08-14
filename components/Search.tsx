import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
const Search = () => {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const search = async () => {
    const requestOptions = {
      method: "GET",
    };
    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();
    if (data?.tracks) {
      setTracks(data?.tracks);
    } else {
      setTracks([]);
    }
  };

  useEffect(() => {
    search();
    if (query === "") {
      setTracks([]);
    }
  }, [query]);

  return (
    <div className="flex flex-col px-8 py-4">
      <span className="text-3xl font-bold">Search for a Song!</span>
      <input
        className="rounded-lg px-4 py-2 my-4 w-30 md:w-96 font-mono text-xl outline-none focus:outline-none"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Search Song"
      ></input>
      {tracks.map((track: any) => (
        <Link href={`/song/${track?.id}`} key={track?.id}>
          <div
            className="flex flex-row items-center align-middle
                      text-white m-2 p-4 hover:cursor-pointer 
                      hover:bg-slate-600/25 break-words"
          >
            <Image
              height="96"
              width="96"
              className="w-1/3"
              src={track?.album?.images[0].url}
              alt={track?.name}
            ></Image>

            <div className="ml-8 w-2/3">
              <h1 className="text-xl sm:text-4xl">{track?.name}</h1>
              <h1 className="text-lg">{track?.artists[0].name}</h1>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Search;
