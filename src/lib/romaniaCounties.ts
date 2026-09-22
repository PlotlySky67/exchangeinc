import raw from "./romania-counties.json";

export interface CountyPath {
  id: string;
  name: string;
  d: string;
}

// Real county boundary paths for Romania (41 județe + Bucharest), sourced
// from the @svg-maps/romania package (CC-BY 4.0).
export const ROMANIA_COUNTIES: CountyPath[] = raw as CountyPath[];
export const ROMANIA_VIEWBOX = "0 0 613 433";
