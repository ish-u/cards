import React, { Fragment, useState, useEffect, useContext } from "react";
import { HexColorPicker } from "react-colorful";
import { AppContext } from "../context/context";
const GradientPicker = () => {
  const { state, dispatch } = useContext(AppContext);
  const [startColor, setStartColor] = useState(state.startColor);
  const [endColor, setEndcolor] = useState(state.endColor);
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState({
    background: `linear-gradient(to right,${startColor}, ${endColor})`,
    animation: "Animation 10s ease infinite",
  });

  useEffect(() => {
    setStyle({
      background: `linear-gradient(to right,${startColor}, ${endColor})`,
      animation: "Animation 10s ease infinite",
    });
  }, [startColor, endColor]);

  return (
    <>
      <div
        className={`!bg-[length:300%_300%] -z-50 fixed h-screen w-screen`}
        style={style}
      ></div>
      <div className="fixed top-0 right-4 z-50">
        {open && (
          <button
            onClick={(e) => {
              setOpen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {!open && (
          <button
            onClick={(e) => {
              setOpen(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      {open && (
        <>
          <div className="absolute flex flex-col justify-end top-0 right-0 z-10 h-full">
            <div
              className="text-white border-black border-2 px-10 py-5
      backdrop-opacity-50 backdrop-invert bg-black/75 rounded-l-xl mb-5"
            >
              <div className="my-4">
                <span className="text-2xl">Start</span>
                <br />
                <br />
                <HexColorPicker color={startColor} onChange={setStartColor} />
              </div>
              <div className="my-4">
                <span className="text-2xl">End</span>
                <br />
                <br />
                <HexColorPicker color={endColor} onChange={setEndcolor} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default GradientPicker;
