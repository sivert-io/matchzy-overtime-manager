import { Logger as print } from "lovely-logs";
import { matchzy_commands, tv_commands } from "../data/commands_to_send_server";
import { sendCommand } from "./rcon";

export async function PingServers() {
  // Ping all servers
  const servers = process.env.server_ids_to_ping?.split(",");

  if (!servers || servers.length === 0) {
    print.info("No servers to ping!");
    return;
  }

  for (const serverId of servers) {
    print.info("Pinging server", serverId);

    // Send these with "" marks
    for (const command of Object.keys(matchzy_commands)) {
      const value = matchzy_commands[command as keyof typeof matchzy_commands];
      await sendCommand(serverId, `${command}${value ? " " + value : ""}`);
      await delay(1000);
    }

    if (process.env.send_tv_commands === "true") {
      // Send these without "" marks
      for (const command of Object.keys(tv_commands)) {
        await sendCommand(
          serverId,
          `${command} ${tv_commands[command as keyof typeof tv_commands]}`
        );
        await delay(1000);
      }
    }
  }

  print.info("Finished pinging all servers.");
  print.info(
    "Waiting for next ping in " +
      (Number(process.env.ping_timeout) || 600000) / 1000 +
      " minutes."
  );
}

// Helper function for delay
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
