import { useEffect, useState, useRef } from "react";
import Item from "./Item";
import {
  openCase,
  cs2RarityColors,
  getCrateRarities,
  selectRare,
} from "./utils";
import UnboxedItem from "./UnboxedItem";

function Case(props) {
  /*
  TODO :- add Skip Animation (DONE)
        - add Unboxing Animation
        - add Search and Sort for the Items Opened
        - add Views for the Items Opened
  */
  const timeOutRef = useRef(null);
  const simulationSample = 3000;
  const { caseData } = props;
  const [rarities, setRarities] = useState([]);
  const [itemsOpen, setItemsOpen] = useState([]);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [translate, setTranslate] = useState(
    " translate-x-[380rem] duration-[0] "
  );
  const [alts, setAlts] = useState([]);
  const [rareOpen, setRareOpen] = useState(false);
  const [unbox, setUnbox] = useState(false);

  useEffect(() => {
    if (itemsOpen.length !== 0) {
      if (open) {
        setUnbox(false);
      } else {
        setUnbox(true);
      }
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        if (!open) {
          openCaseAnimation();
        } else {
          clearTimeout(timeOutRef);
          cleanUpCaseAnimation();
        }
      }
      if (e.key === "Escape") {
        setUnbox(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (caseData) {
      setItems(caseData.contains);
      setRarities(getCrateRarities(caseData));
    }
  }, [caseData]);

  const cleanUpCaseAnimation = () => {
    // FIXME animation lag

    setOpen(false);
    setRareOpen(false);
    setTranslate(" translate-x-[380rem] duration-[0] ");
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
  };
  const openCaseAnimation = () => {
    setOpen(true);
    setTranslate(" translate-x-[-313rem]  duration-[4000ms] ");
    timeOutRef.current = setTimeout(() => cleanUpCaseAnimation(), 4500);
  };

  useEffect(() => {
    if (open) {
      let alts = [...Array(59)].map(() => openCase(caseData));

      // getting rare simulation
      alts[54][0] = "rare";

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
      setItemsOpen((prev) => [...prev, alts[54]]);
      console.log(alts[54]);
    }
  }, [alts, open]);

  const simulation = (types) => {
    const cases = [...Array(simulationSample)].map(() => openCase(caseData));
    return types.map((x) => [x, cases.filter((y) => y[1].rarity === x).length]);
  };

  const mockup = (types) => {
    return [...Array(1000)].map(() => {
      const item = openCase(caseData);
      console.log(item);

      if (item[0] === "rare") {
        item[0] = selectRare(caseData);
      }
      return item;
    });
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
          Simulation with {simulationSample} cases, you would get
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
        <p className="text-yellow-400 animate-bounce ">
          ↑ click or press Enter to open ↑
        </p>
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
          {itemsOpen.map((x, index) => {
            const [skinData, luck] = x;
            return <Item key={index} skinData={skinData} luck={luck} />;
          })}
        </div>
      </div>
      {/* slot machine */}
      {open && (
        <p className="text-yellow-400 animate-bounce my-2">
          press Enter to skip animation
        </p>
      )}

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
      {unbox && (
        <UnboxedItem unbox={unbox} item={itemsOpen[itemsOpen.length - 1]} />
      )}
    </div>
  );
}

export default Case;
