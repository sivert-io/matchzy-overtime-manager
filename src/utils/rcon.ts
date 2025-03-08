import Rcon from "ts-rcon";
import { Logger as print } from "lovely-logs";

class RconSingleton {
  private static instance: RconSingleton;
  private clients: Map<string, Rcon> = new Map();

  private constructor() {}

  public static getInstance(): RconSingleton {
    if (!RconSingleton.instance) {
      RconSingleton.instance = new RconSingleton();
    }
    return RconSingleton.instance;
  }

  private createClient(serverid: string): Rcon {
    const rcon_host = process.env[`${serverid}_rcon_host`];
    const rcon_port = Number(process.env[`${serverid}_rcon_port`]);
    const rcon_password = process.env[`${serverid}_rcon_password`];

    if (!rcon_host || !rcon_port || !rcon_password) {
      throw new Error("RCON details not found for " + serverid);
    }

    const client = new Rcon(rcon_host, rcon_port, rcon_password);
    this.clients.set(serverid, client);
    return client;
  }

  public async sendCommands(
    serverid: string,
    commands: string[]
  ): Promise<string[]> {
    let client = this.clients.get(serverid) || this.createClient(serverid);

    print.info("Connecting to RCON server", serverid);

    try {
      await client.connect();
      print.info("Connected to RCON server", serverid);

      const responses: string[] = [];
      for (const command of commands) {
        print.info("Sending command to RCON", command);
        const res = await client.send(command);
        print.info("Response from RCON server", res);
        responses.push(`${res}`);
      }

      client.disconnect();
      this.clients.delete(serverid);

      return responses;
    } catch (error) {
      print.error("Error occurred", error);
      client.disconnect();
      this.clients.delete(serverid);
      throw error;
    }
  }
}

export default RconSingleton.getInstance();
