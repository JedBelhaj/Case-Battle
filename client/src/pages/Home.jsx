import { useEffect, useState } from "react";
import { cachedSkinData } from "../components/utils";
import { NavLink } from "react-router";
import RainDropSkin from "../components/RainDropSkin";
import ButtonPr from "../components/ButtonPr";
import { RiAccountCircleFill } from "react-icons/ri";

function Home() {
  const skinCount = 200;
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col text-yellow-500 select-none ">
      <RiAccountCircleFill className="absolute top-0 right-0 w-14 h-14 m-4 bg-black/20 p-2 rounded-2xl backdrop-blur-sm hover:scale-110 cursor-pointer z-50 duration-200" />
      <div
        className="flex flex-col items-center justify-center bg-black/40 px-14 py-12 rounded-3xl backdrop-blur-sm z-50
      "
      >
        <h1 className="text-white text-5xl sm:text-7xl font-oxanium text-center">
          Welcome to Case Battle!
        </h1>
        <p>CS 1v1 Case Opening Simulator</p>
        <div className="flex items-center justify-center mt-8 flex-wrap sm:flex-nowrap">
          <div className="flex flex-col items-center justify-center sm:border-r-2 border-white/10 ">
            <p className="">Username:</p>

            <input
              placeholder="ShadawStyleSmpl"
              type="text"
              maxLength={14}
              className="h-10 mx-4 mt-1 rounded-xl bg-zinc-800 border-zinc-700 border-2 text-center text-white focus:border-zinc-700"
            />
            <ButtonPr value={"Create Room"} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="">Room Code:</p>

            <input
              placeholder="ABCD"
              type="text"
              maxLength={14}
              className="h-10 mx-4 mt-1 rounded-xl bg-zinc-800 border-zinc-700 border-2 text-center text-white focus:border-zinc-700"
            />
            <ButtonPr value={"Join a Room"} />
          </div>
        </div>
      </div>

      <div className="absolute overflow-hidden h-screen w-screen flex">
        {Array.from({ length: skinCount }).map((_, index) => (
          <div className="left-[10rem]">
            <RainDropSkin
              className="scale-150"
              key={index}
              Duration={Math.random() * 7000 + 15000}
              Delay={-Math.random() * 14000}
              Index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
