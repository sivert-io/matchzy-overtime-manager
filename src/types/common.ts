type PlayerStats = {
  kills: number;
  deaths: number;
  assists: number;
  flash_assists: number;
  team_kills: number;
  suicides: number;
  damage: number;
  utility_damage: number;
  enemies_flashed: number;
  friendlies_flashed: number;
  knife_kills: number;
  headshot_kills: number;
  rounds_played: number;
  bomb_defuses: number;
  bomb_plants: number;
  "1k": number;
  "2k": number;
  "3k": number;
  "4k": number;
  "5k": number;
  "1v1": number;
  "1v2": number;
  "1v3": number;
  "1v4": number;
  "1v5": number;
  first_kills_t: number;
  first_kills_ct: number;
  first_deaths_t: number;
  first_deaths_ct: number;
  trade_kills: number;
  kast: number;
  score: number;
  mvp: number;
};

type Player = {
  steamid: string;
  name: string;
  stats: PlayerStats;
};

type Team = {
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

type RoundEndEvent = {
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
