import React from "react";
import Marquee from "react-fast-marquee";
const MarqueeBackground = ({
  name,
  artists,
}: {
  name: string;
  artists: { name: string; id: string }[];
}) => {
  return (
    <div
      style={{
        position: "fixed",
        left: -1000,
        // bottom: 0,
        transform: "rotate(-40deg) scale(2)",
      }}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <Marquee
          key={i}
          style={{
            minWidth: "fit-content",
          }}
          gradient={false}
          speed={100}
          loop={0}
          direction={i % 2 ? "left" : "right"}
        >
          <h1 className="text-8xl pb-4 text-zinc-800/25">
            <b>{name}</b> | {artists.map((artist) => artist.name).join(" | ")}
            {" |  "}
            <b>{name}</b> | {artists.map((artist) => artist.name).join(" | ")} |
          </h1>
        </Marquee>
      ))}
    </div>
  );
};

export default MarqueeBackground;
