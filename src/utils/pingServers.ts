import { createLogger, Logger as print } from "lovely-logs";
import { matchzy_commands, tv_commands } from "../data/commands_to_send_server";
import { sendCommand } from "./rcon";

export async function PingServers() {
  // Ping all servers
  const servers = process.env.server_ids_to_ping?.split(",");

  if (!servers) {
    print.info("No servers to ping!");
    return;
  }

  servers.forEach((serverId) => {
    print.info("Pinging server", serverId);

    // Send these with "" marks
    Object.keys(matchzy_commands).forEach((command) => {
      const value = matchzy_commands[command as keyof typeof matchzy_commands];
      sendCommand(serverId, `${command}${value ? " " + value : ""}`);
    });

    if (process.env.send_tv_commands === "true")
      // Send these without "" marks
      Object.keys(tv_commands).forEach((command) => {
        sendCommand(
          serverId,
          `${command} ${tv_commands[command as keyof typeof tv_commands]}`
        );
      });
  });
}
