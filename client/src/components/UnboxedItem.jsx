import Star from "./star.svg?react";
import { ImCross } from "react-icons/im";
import { addHexColor } from "./utils";
import { useState } from "react";
function UnboxedItem({ item, unbox }) {
  const [visibility, setVisibility] = useState(unbox);
  console.log(unbox);

  console.log(item[0].image);
  const color = item[0].rarity.color;
  console.log(color);

  return (
    <div
      className={`fixed top-0 h-screen w-full bg-black/10 backdrop-blur-md flex flex-col items-center justify-center animate-[scale] ${
        visibility ? "" : "hidden"
      }`}
    >
      <p className="absolute top-0 m-2 text-zinc-300">
        press Escape to close this window
      </p>
      <ImCross
        onClick={() => setVisibility(false)}
        className="fill-white/70 absolute z-50 w-12 h-12 top-0 right-48 m-4 cursor-pointer hover:scale-110 transition-all duration-200"
      />
      <Star
        style={{ fill: color }}
        className={`fill-[${color}] w-[40rem] h-[40rem] animate-[spin_15s_infinite_linear] absolute`}
      />
      <Star
        style={{ fill: addHexColor(color, "001100") }}
        className="w-96 h-96 animate-[spin_30s_infinite_linear_] absolute"
      />
      <img className="z-50" src={item[0].image} alt="" />
      <h1 className="text-6xl z-50 text-white font-oxanium">{item[0].name}</h1>
    </div>
  );
}

export default UnboxedItem;