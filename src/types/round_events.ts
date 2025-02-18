import { Team } from "./team";

export type RoundEndEvent = {
  event: "round_end";
  matchid: number;
  map_number: number;
  round_number: number;
  round_time: number;
  reason: number;
  winner: {
    side: "ct" | "t";
    team: "team1" | "team2";
  };
  team1: Team;
  team2: Team;
};
