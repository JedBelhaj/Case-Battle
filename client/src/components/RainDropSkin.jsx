import { useEffect, useState, useRef } from "react";
import { cachedSkinData } from "../components/utils";
import Star from "../components/star.svg?react";

function RainDropSkin({ Duration, Index, Delay }) {
  const [animDuration, setAnimDuration] = useState(Duration + Delay);
  const getSkin = () => {
    return cachedSkinData[Math.floor(Math.random() * cachedSkinData.length)];
    // return cachedSkinData.find((x) => x.name == "AWP | Dragon Lore");
  };

  const getPosition = () => {
    return {
      left: Math.floor(Math.random() * 100) + "vw",
      top: -10 + "vw", // Start slightly above the viewport
    };
  };

  const [skin, setSkin] = useState(getSkin());
  const [pos, setPos] = useState(getPosition());
  const imgRef = useRef(null); // Ref to access the <img> element

  useEffect(() => {
    const imgElement = imgRef.current;

    // Function to handle animation iteration (reset)
    const handleAnimationIteration = () => {
      setPos(getPosition()); // Reset the position
    };

    // Add event listener for animationiteration
    imgElement.addEventListener("animationiteration", handleAnimationIteration);

    // Cleanup: Remove event listener on unmount
    return () => {
      imgElement.removeEventListener(
        "animationiteration",
        handleAnimationIteration
      );
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <div
      style={{
        left: pos.left,
        top: pos.top,
        animationDelay: Delay + "ms",
        animationDuration: Duration + "ms", // Sync animation duration with Duration prop
        animationRangeStart: "50%",
      }}
      className={`w-20 h-16 absolute animate-raindrop-1 animate-spin flex items-center justify-center -z-[${
        Duration >= 5100 ? 10 : 0
      }]`}
    >
      <img
        ref={imgRef} // Attach the ref to the <img> element
        src={skin.image}
        alt=""
      />
      {skin.name === "AWP | Dragon Lore" && (
        <Star className="fill-yellow-500 w-24 absolute h-24 -z-40 animate-[spin_15s_infinite_linear]" />
      )}
    </div>
  );
}

export default RainDropSkin;
