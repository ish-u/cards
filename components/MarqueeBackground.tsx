import React from "react";
import Marquee from "react-fast-marquee";
const MarqueeBackground = ({
  name,
  artist,
}: {
  name: string;
  artist: string;
}) => {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        // bottom: 0,
        transform: "rotate(-40deg) scale(2)",
      }}
    >
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((i) => (
        <Marquee
          key={i}
          style={{
            minWidth: "fit-content",
          }}
          gradient={false}
          speed={100}
          loop={0}
        >
          <h1 className="text-8xl pb-4 text-zinc-800/25">
            {name} | {artist} | {name} | {artist} |
          </h1>
        </Marquee>
      ))}
    </div>
  );
};

export default MarqueeBackground;
