import { RoundEndEvent } from "../types/round_events";
import { Logger as print } from "lovely-logs";
import { endMatch } from "./server";
import "dotenv/config";
import { calculateTeamDamage } from "./tools";

const max_rounds = Number(process.env.max_rounds) || 24;

export function handleRoundEndEvent(
  serverId: string,
  matchDetails: RoundEndEvent
) {
  // Implement logic to handle round end event here
  const team1Damage = calculateTeamDamage(matchDetails.team1);
  const team2Damage = calculateTeamDamage(matchDetails.team2);

  print.info(matchDetails);

  const teamMostDamage = team1Damage > team2Damage ? "team1" : "team2";

  print.success(`[${serverId}] Team with most damage: ${teamMostDamage}`);
  print.info(
    `[${serverId}] Round number: ${matchDetails.round_number}, max rounds allowed: ${max_rounds}`
  );

  if (matchDetails.round_number >= max_rounds) {
    print.warn(`[${serverId}] Max rounds reached. Ending match.`);

    endMatch(
      serverId,
      teamMostDamage,
      {
        team1: team1Damage,
        team2: team2Damage,
      },
      matchDetails
    );
  }
}
