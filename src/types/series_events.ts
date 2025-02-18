import { TeamBasic } from "./team";

export type SeriesStartEvent = {
  event: "series_start";
  matchid: number;
  num_maps: number;
  team1: TeamBasic;
  team2: TeamBasic;
};

export type SeriesEndEvent = {
  event: "series_end";
  matchid: number;
  team1_series_score: number;
  team2_series_score: number;
  winner: {
    side: "ct" | "t";
    team: "team1" | "team2";
  };
  time_until_restore: number;
};
