import Rcon from "rcon-ts";
import { Logger as print } from "lovely-logs";

export async function sendCommands(serverId: string, commands: string[]) {
  const rcon_host = process.env[`${serverId}_rcon_host`];
  const rcon_port = Number(process.env[`${serverId}_rcon_port`]);
  const rcon_password = process.env[`${serverId}_rcon_password`];

  if (!rcon_host || !rcon_port || !rcon_password) {
    print.error(`❌ RCON details not found for ${serverId}`);
    return Promise.resolve([]);
  }

  const client = new Rcon({
    host: rcon_host,
    port: rcon_port,
    password: rcon_password,
    timeout: 5000,
  });

  await client
    .session(async (c) => {
      for (const command of commands) {
        print.info(`Sending command: ${command}`);
        await c.send(command);
      }
    })
    .then(
      () => print.success(`Finished sending commands to ${serverId}`),
      (reason) =>
        print.error(`❌ Error sending commands to ${serverId}: ${reason}`)
    );
}
