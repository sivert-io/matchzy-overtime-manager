import { RoundEndEvent } from "../types/round_events";
import { sendCommand } from "./rcon";
import { printTeamIndividualDamage, timeout } from "./tools";

export async function endMatch(
  serverId: string,
  winner: "team1" | "team2",
  totalDamage: { team1: number; team2: number },
  matchDetails: RoundEndEvent
) {
  sendCommand(
    serverId,
    [
      `css_fp`,
      `matchzy_admin_chat_prefix {BlueGrey}`,
      `css_asay ʕᵔᴥᵔʔ`,
      `css_asay ʕᵔᴥᵔʔ`,
      `css_asay ʕᵔᴥᵔʔ`,
      `css_asay ʕᵔᴥᵔʔ`,
      `css_asay ʕᵔᴥᵔʔ`,
      `css_asay ʕᵔᴥᵔʔ`,
      `css_asay ʕᵔᴥᵔʔ`,
      `css_asay ʕᵔᴥᵔʔ`,
      `css_asay ʕᵔᴥᵔʔ`,
      `css_asay ʕᵔᴥᵔʔ`,
      `css_asay ʕᵔᴥᵔʔ`,
      `matchzy_admin_chat_prefix {Red}[ADMIN]{Default}`,
      `css_asay The match has concluded!!`,
    ].join(";")
  );

  await timeout(5000);

  sendCommand(
    serverId,
    `css_asay The winner will be the team with the highest total damage.`
  );

  await timeout(5000);

  sendCommand(
    serverId,
    [
      `css_asay [PLAYERS DAMAGE]`,
      ...printTeamIndividualDamage(matchDetails),
      `css_asay And the winner is...`,
    ].join(";")
  );

  await timeout(5000);

  sendCommand(
    serverId,
    [
      `css_asay ~ ヽ(´ー｀)ノ ~ ヽ(´ー｀)ノ ~ ヽ(´ー｀)ノ`,
      `css_asay ヽ(´ー｀)ノ ${matchDetails[winner].name} ヽ(´ー｀)ノ`,
      `css_asay ~ ヽ(´ー｀)ノ ~ ヽ(´ー｀)ノ ~ ヽ(´ー｀)ノ`,
    ].join(";")
  );

  await timeout(5000);

  sendCommand(
    serverId,
    [
      `css_asay GG WP!`,
      `css_asay ${matchDetails.team1.name}: ${totalDamage.team1}`,
      `css_asay ${matchDetails.team2.name}: ${totalDamage.team2}`,
    ].join(";")
  );

  await timeout(10000);

  sendCommand(serverId, `get5_endmatch ${winner}`);
}
