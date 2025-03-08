import { Logger as print } from "lovely-logs";
import { matchzy_commands, tv_commands } from "../data/commands_to_send_server";
import { sendCommands } from "./rcon"; // Adjust the path

export async function PingServers() {
  const servers = process.env.server_ids_to_ping?.split(",");

  if (!servers || servers.length === 0) {
    print.info("No servers to ping!");
    return;
  }

  for (const serverId of servers) {
    print.info(`Pinging server ${serverId}`);

    const commands: string[] = [
      ...Object.keys(matchzy_commands).map((command) => {
        const cmd = matchzy_commands[command as keyof typeof matchzy_commands];
        return `${command} ${(cmd && `"${cmd}"`) || ""}`;
      }),
    ];

    commands.push("matchzy_remote_log_header_value " + serverId);

    if (process.env.send_tv_commands === "true") {
      commands.push(
        ...Object.keys(tv_commands).map(
          (command) =>
            `${command} ${tv_commands[command as keyof typeof tv_commands]}`
        )
      );
    }
    await sendCommands(serverId, commands);
  }

  print.info("✔ Finished pinging all servers.");
  print.info(
    `ℹ Waiting for next ping in ${
      (Number(process.env.ping_timeout) || 300000) / 60000
    } minutes.`
  );
}
