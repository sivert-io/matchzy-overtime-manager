import { RoundEndEvent } from "../types/round_events";
import { TeamDetailed } from "../types/team";

export function calculateTeamDamage(teamDetails: TeamDetailed): number {
  let teamDamage = 0;

  teamDetails.players.forEach((player) => {
    teamDamage += player.stats.damage;
  });

  return teamDamage;
}

export function printTeamIndividualDamage(matchDetails: RoundEndEvent) {
  const sortedByDamage = matchDetails.team1.players
    .concat(matchDetails.team2.players)
    .sort((a, b) => b.stats.damage - a.stats.damage);

  return sortedByDamage.map((player) => {
    return `css_asay ${formatNumberWithCommas(player.stats.damage)} ${
      player.name
    } (${player.stats.kills} kills, ${player.stats.assists} assists, ${
      player.stats.deaths
    } deaths)`;
  });
}

export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatNumberWithCommas(num: number): string {
  return num.toLocaleString("en-US");
}
