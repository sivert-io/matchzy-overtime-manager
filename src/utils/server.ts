import { Logger as print } from "lovely-logs";
import { RoundEndEvent } from "../types/round_events";
import { sendCommands } from "./rcon"; // Adjust the path accordingly
import { printTeamIndividualDamage } from "./tools";
import { sendWebhook } from "./webhook";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function endMatch(
  serverId: string,
  winner: "team1" | "team2",
  totalDamage: { team1: number; team2: number },
  matchDetails: RoundEndEvent
) {
  const commandGroups: string[][] = [
    [
      `css_fp`,
      `matchzy_admin_chat_prefix {BlueGrey}`,
      ...Array(10).fill(`css_asay ʕᵔᴥᵔʔ`),
    ],
    [
      ...Array(10).fill(`css_asay ʕᵔᴥᵔʔ`),
      `matchzy_admin_chat_prefix {Red}[ADMIN]{Default}`,
    ],
    [`css_asay The match has concluded!!`],
    [`css_asay The winner will be the team with the highest total damage.`],
    printTeamIndividualDamage(matchDetails),
    [`css_asay And the winner is...`],
    [`css_asay ${matchDetails[winner].name}!!`],
    [
      `css_asay GG WP!`,
      `css_asay ${matchDetails.team1.name} total damage: ${totalDamage.team1}`,
      `css_asay ${matchDetails.team2.name} total damage: ${totalDamage.team2}`,
    ],
    [`get5_endmatch ${winner}`],
  ];

  let chain = Promise.resolve();

  commandGroups.forEach((group, index) => {
    chain = chain
      .then(() => sendCommands(serverId, group))
      .then(() => {
        if (index < commandGroups.length - 1) {
          return delay(2000); // 2-second delay between message groups
        }
      })
      .catch((error) => {
        print.error(`❌ Error sending RCON commands to ${serverId}:`, error);
      });
  });

  // Send the webhook at the same time as the final chat message
  chain.finally(() => {
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
  });
}
