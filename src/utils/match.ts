import { RoundEndReasons } from "../data/round";
import { RoundEndEvent } from "../types/round_events";
import { TeamDetailed } from "../types/team";
import { Logger as print } from "lovely-logs";

function calculateTeamDamage(teamDetails: TeamDetailed): number {
  let teamDamage = 0;

  print.info(teamDetails.players);

  teamDetails.players.forEach((player) => {
    // Calculate team damage for team 1
    teamDamage += player.stats.damage;
  });

  return teamDamage;
}

export function handleRoundEndEvent(
  serverId: string,
  matchDetails: RoundEndEvent
) {
  // Implement logic to handle round end event here
  const team1Damage = calculateTeamDamage(matchDetails.team1);
  const team2Damage = calculateTeamDamage(matchDetails.team2);

  const teamMostDamage = team1Damage > team2Damage ? "Team 1" : "Team 2";

  print.success(`Team with most damage: ${teamMostDamage}`);
  print.info(`Round number: ${matchDetails.round_number}`);

  if (matchDetails.round_number === 24) {
    print.warn(`First overtime started`);
  }
  if (matchDetails.round_number === 30) {
    print.warn(`Second overtime started`);
  }
  if (matchDetails.round_number === 36) {
    print.warn(`Third overtime started`);
  }
}
