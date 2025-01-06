import { useEffect, useState } from "react";

function Case(props) {
  const { caseData } = props;
  const [itemsOpened, setItemsOpened] = useState([]);

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [translate, setTranslate] = useState(" translate-x-[-96rem] ");
  const [alts, setAlts] = useState([]);

  useEffect(() => {
    if (caseData) {
      setItems(caseData.contains);
    }
  }, [caseData]);

  const RNG = () => {
    let rarity = Math.random();
    if (rarity < 0.0025575) {
      rarity = "Special Item";
    } else if (rarity < 0.0089514) {
      rarity = "#eb4b4b";
    } else if (rarity < 0.0409207) {
      rarity = "#d32ce6";
    } else if (rarity < 0.2007672) {
      rarity = "#8847ff";
    } else {
      rarity = "#4b69ff";
    }
    let statTrack = Math.random();
    statTrack = statTrack <= 0.1;

    let float = Math.random();
    let wear;
    if (float < 0.03) {
      float = Math.random() * 0.07;
      wear = "Factory New";
    } else if (float < 0.27) {
      float = Math.random() * 0.8 + 0.07;
      wear = "Minimal Wear";
    } else if (float < 0.6) {
      float = Math.random() * 0.23 + 0.15;
      wear = "Field Tested";
    } else if (float < 0.84) {
      float = Math.random() * 0.07 + 0.45;
      wear = "Well Worn";
    } else {
      float = Math.random() * 0.55 + 0.45;
      wear = "Battle Scarred";
    }
    return {
      rarity: rarity,
      statTrack: statTrack,
      float: float,
      wear: wear,
      pattern: Math.floor(Math.random() * 1000),
    };
  };

  const openCase = () => {
    const luck = RNG();
    const filteredItems = items.filter((x) => x.rarity.color === luck.rarity);

    if (filteredItems.length === 0) return [null, luck]; // Avoid empty filteredItems

    return [
      filteredItems[Math.floor(Math.random() * filteredItems.length)],
      luck,
    ];
  };
  const openCaseAnimation = () => {
    setOpen(true);
    setTimeout(() => {
      setTranslate(" translate-x-[-675rem] ");
    }, 100);
    setTranslate(" translate-x-[-96rem] ");
    setTimeout(() => {
      setOpen(false);
    }, 6000);
  };

  useEffect(() => {
    if (open) {
      setAlts([...Array(59)].map(() => openCase()));
      alts.forEach((x, index) => {
        console.log(index + " " + x[0].name);
      });
    } else {
      setAlts([]);
    }
  }, [open]);

  useEffect(() => {
    if (alts.length === 59 && open) {
      setItemsOpened((prev) => [...prev, alts[54]]);
      console.log(alts[54]);
    }
  }, [alts, open]);

  if (!caseData) {
    return <div>No case selected</div>;
  }

  return (
    <div className="flex justify-center">
      <div
        className={
          "flex flex-col items-center justify-center transition-all" +
          (open ? " hidden " : "")
        }
      >
        {/* case */}
        <img
          onClick={openCaseAnimation}
          className="w-72 p-4 hover:scale-110 transition-all duration-150 ease-out cursor-pointer "
          src={caseData.image}
        />

        <p className="text-yellow-400 animate-bounce ">↑ click to open ↑</p>
        {/* items */}
        <div className="flex flex-wrap m-10 gap-4 p-4">
          {caseData.contains.map((x) => (
            <div
              key={x.name}
              className="flex items-center justify-start flex-col hover:scale-110 transition-all duration-150 ease-in-out cursor-default text-sm"
            >
              <img className="w-28 " src={x.image} alt={x.name} />
              <p
                style={{ color: x.rarity.color }}
                className="text-white max-w-24 text-center"
              >
                {x.name}
              </p>
            </div>
          ))}
        </div>

        {/* items you opened */}
        <h1 className="text-yellow-400 text-xl mt-8">Items you Opened:</h1>
        <div className="flex flex-wrap m-10 overflow-scroll max-h-60 gap-4 p-4">
          {itemsOpened.map((x, index) => {
            const [skinData, luck] = x;
            return (
              <div
                key={index}
                className="flex items-center justify-start flex-col hover:scale-110 transition-all duration-150 ease-in-out cursor-default text-sm"
              >
                <img
                  className="w-28 "
                  src={skinData.image}
                  alt={skinData.name}
                />
                <p
                  style={{ color: skinData.rarity.color }}
                  className="text-white max-w-24 text-center"
                >
                  {skinData.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* slot machine */}
      <div className="flex items-center justify-center overflow-clip ">
        <div
          className={` border-x-2 border-white rounded-full opacity-40 translate-x-[7.9svw] h-32 z-50 ${
            open ? "" : " hidden "
          } `}
        ></div>
        <div className={`w-1/5  ${open ? "" : " hidden "}`}>
          <div
            className={`flex-row flex transition-all float-left -z-50 ease-out duration-[4000ms] ${translate} `}
          >
            {alts.map((x, index) => {
              const item = x[0];
              return (
                <img
                  key={index}
                  style={{ borderTopColor: item?.rarity.color }}
                  className={`w-[192px] border-t-2 m-1 -z-50`}
                  src={item?.image}
                  alt={item?.name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Case;
