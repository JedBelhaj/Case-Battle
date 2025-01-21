export const cs2RarityColors = {
  "#b0c3d9": ["Consumer Grade", "Gray"],
  "#5e98d9": ["Industrial Grade", "Baby Blue"],
  "#4b69ff": ["Mil-Spec", "Blue"],
  "#8847ff": ["Restricted", "Purple"],
  "#d32ce6": ["Classified", "Pink"],
  "#eb4b4b": ["Covert", "Red"],
  "#e4ae39": ["Contraband", "Orange"],
  rare: ["Exceedingly Rare", "Rare"],
};

const odds = {
  Case: {
    "Mil-Spec": 79.92,
    Restricted: 15.98,
    Classified: 3.2,
    Covert: 0.64,
    "Exceedingly Rare": 0.26,
  },
  Souvenir: {
    "Consumer Grade": 80,
    "Industrial Grade": 16,
    "Mil-Spec": 3.2,
    Restricted: 0.64,
    Classified: 0.128,
    Covert: 0.256,
  },
  Capsule: {
    "Mil-Spec": 80,
    Restricted: 16,
    Classified: 3.2,
    Covert: 0.641,
  },
};

export function selectRarity(caseData) {
  const rarities = getCrateRarities(caseData);

  const random = Math.random();
  let cumulative = 0;

  for (let i = 0; i < rarities.length; i++) {
    cumulative += odds[caseData.type][rarities[i]];
    if (random < cumulative) {
      return rarities[i];
    }
  }
  return rarities[rarities.length - 1];
}

function statTrack() {
  return Math.random() <= 0.1;
}

function selectFloat(minFloat, maxFloat) {
  let float = Math.random() * (maxFloat - minFloat) + minFloat;
  let wear = "";
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
  return { float, wear };
}

function selectPaintIndex() {
  return Math.floor(Math.random() * 1000);
}

export const RNG = (caseData) => {
  const { float, wear } = selectFloat();
  return {
    rarity: selectRarity(caseData),
    statTrack: statTrack(),
    float,
    wear,
    pattern: selectPaintIndex(),
  };
};

export const openCase = (caseData) => {
  const items = caseData.contains;
  const luck = RNG(caseData);

  if (luck.rarity === "rare") {
    return ["rare", luck];
  }

  const filteredItems = items.filter((x) => x.rarity.color === luck.rarity);
  if (filteredItems.length === 0) return [null, luck];

  return [
    filteredItems[Math.floor(Math.random() * filteredItems.length)],
    luck,
  ];
};

export function getCrateRarities(crate) {
  if (crate) {
    const rarities = crate.contains.map((x) => x.rarity.color).filter(unique);
    if (crate.contains_rare.length > 0) {
      rarities.push("rare");
    }
    // Ensure rarities are in the correct order
    return rarities.sort((a, b) => odds[crate.type][b] - odds[crate.type][a]);
  }
}

function unique(x, index, arr) {
  return arr.indexOf(x) === index;
}

export function getAllRarities(crates) {
  const rarities = crates
    .map((x) => getCrateRarities(x))
    .filter((x) => x.length != 0)
    .map((x) => x.reduce((x, y) => x + ", " + y))
    .filter(unique);
  return rarities;
}
