import Rcon from "ts-rcon";
import { Logger as print } from "lovely-logs";

export async function sendCommand(serverid: string, command: string) {
  const rcon_host = process.env[`${serverid}_rcon_host`];
  const rcon_port = Number(process.env[`${serverid}_rcon_port`]);
  const rcon_password = process.env[`${serverid}_rcon_password`];

  if (!rcon_host || !rcon_port || !rcon_password) {
    throw new Error("RCON details not found for " + serverid);
  }

  const client = new Rcon(rcon_host, rcon_port, rcon_password);

  print.info("Connecting to RCON server", serverid);

  await client.connect();

  try {
    print.info(`Please wait for Server Authentication:`);
    client.connect();
    client
      .on("auth", function () {
        print.info("Connected to RCON server", serverid);
        print.info("Sending command to RCON", command);
        client.send(command);
      })
      .on("response", (str) => {
        print.info("Response from RCON server", str);
      })
      .on("end", () => {
        print.info("RCON socket closed!");
      })
      .on("error", (error) => {
        print.error("Error occurred", error);
        client.disconnect();
      });
  } catch (error) {
    console.error(error);
  }
}
