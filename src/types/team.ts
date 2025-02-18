import { Player } from "./player";

export type Team = {
  id: string;
  name: string;
  series_score: number;
  score: number;
  score_ct: number;
  score_t: number;
  players: Player[];
  side: "ct" | "t";
  starting_side: "ct" | "t";
};

export type TeamBasic = {
  id: string;
  name: string;
};

export type TeamDetailed = TeamBasic & {
  series_score: number;
  score: number;
  score_ct: number;
  score_t: number;
  players: Player[];
  side: "ct" | "t";
  starting_side: "ct" | "t";
};
