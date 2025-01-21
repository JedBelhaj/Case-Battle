function SlotMachine() {
  return (
    <div className="flex items-center z-50 justify-center overflow-clip">
      <div className="w-1 h-32 rounded-full opacity-40 bg-white absolute "></div>
      {alts.map((x, index) => {
        const item = x[0];
        if (item === "rare") {
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
  );
}

export default SlotMachine;
