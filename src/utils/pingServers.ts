import { Logger as print } from "lovely-logs";
import { matchzy_commands, tv_commands } from "../data/commands_to_send_server";
import RconSingleton from "./rcon"; // Adjust the path accordingly

export async function PingServers() {
  // Ping all servers
  const servers = process.env.server_ids_to_ping?.split(",");

  if (!servers || servers.length === 0) {
    print.info("No servers to ping!");
    return;
  }

  for (const serverId of servers) {
    print.info("Pinging server", serverId);

    const commands: string[] = [];

    // Send these with "" marks
    for (const command of Object.keys(matchzy_commands)) {
      const value = matchzy_commands[command as keyof typeof matchzy_commands];
      commands.push(`${command}${value ? " " + value : ""}`);
    }

    if (process.env.send_tv_commands === "true") {
      // Send these without "" marks
      for (const command of Object.keys(tv_commands)) {
        commands.push(
          `${command} ${tv_commands[command as keyof typeof tv_commands]}`
        );
      }
    }

    // Send all commands in one batch
    try {
      const responses = await RconSingleton.sendCommands(serverId, commands);
      responses.forEach((response, index) => {
        print.info(`Response for command ${commands[index]}: ${response}`);
      });
    } catch (error) {
      print.error(`Failed to send commands to ${serverId}:`, error);
    }

    // We probably dont need delay with an rcon-singleton that sends bursts to each server.
    // await delay(1000);
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
