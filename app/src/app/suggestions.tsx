export enum Domain {
  any,
  celebrity,
  music,
  geography,
  food,
  //   history,
  //   science,
  //   movies,
  //   sports,
  //   literature,
  //   industry,
  //   mythology,
  //   brainrot,
  //   boomers,
  //   culture,
}

const suggestions: {
  domain: Domain;
  value: string;
}[] = [
  { domain: Domain.celebrity, value: "famous Michelles" },
  { domain: Domain.celebrity, value: "famous Daniels" },
  { domain: Domain.music, value: "Beatles songs" },
  { domain: Domain.geography, value: "cities in Ohio" },
  { domain: Domain.food, value: "vegetables beginning with c" },
  { domain: Domain.geography, value: "US states" },
];

export default suggestions;
