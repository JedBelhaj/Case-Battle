import { useEffect, useState } from "react";
import Item from "./Item";
import {
  openCase,
  cs2RarityColors,
  getCrateRarities,
  selectRare,
} from "./utils";

function Case(props) {
  const { caseData } = props;

  const [rarities, setRarities] = useState([]);
  const [itemsOpened, setItemsOpened] = useState([]);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [translate, setTranslate] = useState(
    " translate-x-[380rem] duration-[0] "
  );
  const [alts, setAlts] = useState([]);
  const [rareOpen, setRareOpen] = useState(false);

  useEffect(() => {
    if (caseData) {
      setItems(caseData.contains);
      setRarities(getCrateRarities(caseData));
    }
  }, [caseData]);

  const openCaseAnimation = () => {
    setOpen(true);
    setTranslate(" translate-x-[-313rem]  duration-[4000ms] ");
    setTimeout(() => {
      setOpen(false);
      setRareOpen(false);
      setTranslate(" translate-x-[380rem] duration-[0] ");
    }, 6000);
  };

  useEffect(() => {
    if (open) {
      let alts = [...Array(59)].map(() => openCase(caseData));

      // getting rare simulation

      if (alts[54][0] == "rare") {
        setRareOpen(true);
      }

      const rares = alts.filter((x) => x[0] === "rare");

      // handle rares

      for (let i = 0; i < rares.length; i++) {
        const rareIndex = alts.indexOf(rares[i]);
        if (rareIndex != 54) {
          while (alts[rareIndex][0] === "rare") {
            alts[rareIndex] = openCase(caseData);
          }
        }
      }

      setAlts(alts);
    } else {
      setAlts([]);
    }
  }, [open]);

  useEffect(() => {
    if (alts.length === 59 && open) {
      if (alts[54][0] === "rare") {
        alts[54][0] = selectRare(caseData);
      }
      setItemsOpened((prev) => [...prev, alts[54]]);
      console.log(alts[54]);
    }
  }, [alts, open]);

  const simulation = (types) => {
    const cases = [...Array(1000)].map(() => openCase(caseData));
    return types.map((x) => [x, cases.filter((y) => y[1].rarity === x).length]);
  };

  const mockup = (types) => {
    return [...Array(30)].map(() => openCase(caseData));
  };

  if (!caseData) {
    return <div>No case selected</div>;
  }

  return (
    <div className="flex justify-center items-center flex-col w-full">
      <div
        className={`
          flex flex-col items-center justify-center transition-all w-full 
          ${open ? " hidden " : ""}`}
      >
        <div className="flex flex-col items-center text-white">
          Simulation with 1000 cases, you would get
          {simulation(rarities).map((x, index) => (
            <strong
              key={index}
              style={{ color: x[0] === "rare" ? "#e8c40c" : x[0] }}
            >
              {" " + x[1] + " " + cs2RarityColors[x[0]][0] + " "}
            </strong>
          ))}
        </div>
        {/* case */}
        <img
          onClick={openCaseAnimation}
          className="w-72 p-4 hover:scale-110 transition-all duration-150 ease-out cursor-pointer "
          src={caseData.image}
        />
        <p className="text-yellow-400 animate-bounce ">↑ click to open ↑</p>
        {/* items */}
        <div className="flex flex-wrap m-10 gap-4 p-4 items-center justify-center">
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

        <div className="flex flex-wrap items-center justify-center m-10 overflow-y-scroll max-h-60 gap-4 p-4 w-full">
          {itemsOpened.map((x, index) => {
            const [skinData, luck] = x;
            return <Item key={index} skinData={skinData} luck={luck} />;
          })}
        </div>
      </div>
      {/* slot machine */}
      <div className={`flex items-center justify-center overflow-clip`}>
        <div
          className={`w-1 h-32 rounded-full opacity-40 bg-white absolute z-50  ${
            open ? "" : " hidden "
          }`}
        ></div>
        <div
          className={`
          flex items-center justify-center ease-out transition-all
          ${" " + translate}`}
        >
          {alts.map((x, index) => {
            const item = x[0];

            if (rareOpen && index == 54) {
              return (
                <img
                  key={index}
                  style={{ borderTopColor: "#e8c40c" }}
                  src="assets/rare.png"
                  className={`w-48 border-t-2 m-1 -z-50`}
                  alt="rare item"
                />
              );
            }
            return (
              <img
                key={index}
                style={{ borderTopColor: item?.rarity.color }}
                className={`w-48 border-t-2 m-1 -z-50`}
                src={item?.image}
                alt={item?.name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Case;
