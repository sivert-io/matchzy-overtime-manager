import { RoundEndEvent } from "../types/round_events";
import RconSingleton from "./rcon"; // Adjust the path accordingly
import { printTeamIndividualDamage, timeout } from "./tools";
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
  ];

  await RconSingleton.sendCommands(serverId, commands);
  await timeout(5000);

  await RconSingleton.sendCommands(serverId, [
    `css_asay The winner will be the team with the highest total damage.`,
  ]);
  await timeout(5000);

  const damageCommands = [
    ...printTeamIndividualDamage(matchDetails),
    `css_asay And the winner is...`,
  ];
  await RconSingleton.sendCommands(serverId, damageCommands);
  await timeout(2500);

  await RconSingleton.sendCommands(serverId, [
    `css_asay ${matchDetails[winner].name}!!`,
  ]);

  sendWebhook({
    team1: matchDetails.team1.name,
    team2: matchDetails.team2.name,
    roundsWon1: matchDetails.team1.score,
    roundsWon2: matchDetails.team2.score,
    totalDamage1: totalDamage.team1,
    totalDamage2: totalDamage.team2,
    winner: matchDetails[winner].name,
  });

  await timeout(5000);

  const finalCommands = [
    `css_asay GG WP!`,
    `css_asay ${matchDetails.team1.name} total damage: ${totalDamage.team1}`,
    `css_asay ${matchDetails.team2.name} total damage: ${totalDamage.team2}`,
  ];
  await RconSingleton.sendCommands(serverId, finalCommands);

  await timeout(10000);

  await RconSingleton.sendCommands(serverId, [`get5_endmatch ${winner}`]);
}
