import { Logger as print } from "lovely-logs";
import { RoundEndEvent } from "../types/round_events";
import RconSingleton from "./rcon"; // Adjust the path accordingly
import { printTeamIndividualDamage } from "./tools";
import { sendWebhook } from "./webhook";

export async function endMatch(
  serverId: string,
  winner: "team1" | "team2",
  totalDamage: { team1: number; team2: number },
  matchDetails: RoundEndEvent
) {
  const commands: string[] = [
    `css_fp`,
    `matchzy_admin_chat_prefix {BlueGrey}`,
    ...Array(20).fill(`css_asay ʕᵔᴥᵔʔ`), // Repeated asay messages
    `matchzy_admin_chat_prefix {Red}[ADMIN]{Default}`,
    `css_asay The match has concluded!!`,
    `css_asay The winner will be the team with the highest total damage.`,
    ...printTeamIndividualDamage(matchDetails),
    `css_asay And the winner is...`,
    `css_asay ${matchDetails[winner].name}!!`,
    `css_asay GG WP!`,
    `css_asay ${matchDetails.team1.name} total damage: ${totalDamage.team1}`,
    `css_asay ${matchDetails.team2.name} total damage: ${totalDamage.team2}`,
    `get5_endmatch ${winner}`,
  ];

  try {
    await RconSingleton.sendCommands(serverId, commands);
  } catch (error) {
    print.error(`Error sending RCON commands to ${serverId}:`, error);
  }

  sendWebhook({
    team1: matchDetails.team1.name,
    team2: matchDetails.team2.name,
    roundsWon1: matchDetails.team1.score,
    roundsWon2: matchDetails.team2.score,
    totalDamage1: totalDamage.team1,
    totalDamage2: totalDamage.team2,
    winner: matchDetails[winner].name,
  });

  print.info(`✔ Match end sequence completed for server ${serverId}`);
}
