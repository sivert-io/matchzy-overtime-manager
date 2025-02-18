import { TeamDetailed } from "./team";

export type MapResultEvent = {
  event: "map_result";
  matchid: number;
  map_number: number;
  team1: TeamDetailed;
  team2: TeamDetailed;
  winner: {
    side: "ct" | "t";
    team: "team1" | "team2";
  };
};

export type MapPickedEvent = {
  event: "map_picked";
  matchid: number;
  team: "team1" | "team2";
  map_name: string;
  map_number: number;
};

export type MapVetoedEvent = {
  event: "map_vetoed";
  matchid: number;
  team: "team1" | "team2";
  map_name: string;
};

export type SidePickedEvent = {
  event: "side_picked";
  matchid: number;
  team: "team1" | "team2";
  map_name: string;
  side: "ct" | "t";
  map_number: number;
};
