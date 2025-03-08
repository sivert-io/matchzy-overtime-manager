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

  private async createClient(serverId: string): Promise<Rcon> {
    const rcon_host = process.env[`${serverId}_rcon_host`];
    const rcon_port = Number(process.env[`${serverId}_rcon_port`]);
    const rcon_password = process.env[`${serverId}_rcon_password`];

    if (!rcon_host || !rcon_port || !rcon_password) {
      throw new Error(`RCON details not found for ${serverId}`);
    }

    const client = new Rcon(rcon_host, rcon_port, rcon_password);
    this.clients.set(serverId, client);

    try {
      print.info(`Connecting to RCON server ${serverId}`);
      await client.connect();
      print.info(`Connected to RCON server ${serverId}`);
    } catch (error) {
      print.error(`Failed to connect to RCON server ${serverId}`, error);
      this.clients.delete(serverId);
      throw error;
    }

    return client;
  }

  public async sendCommands(
    serverId: string,
    commands: string[]
  ): Promise<string[]> {
    let client = this.clients.get(serverId);

    print.info(`Sending commands to server ${serverId}:`, commands);

    const responses: string[] = [];

    try {
      if (!client) {
        client = await this.createClient(serverId);
      }
      for (const command of commands) {
        print.info(`Sending command to RCON: ${command}`);
        const response = await client.send(command);
        print.info(`Response from RCON server: ${response}`);
        responses.push(`${response}`);
        await this.delay(1000); // Small delay to prevent overwhelming the RCON connection
      }
    } catch (error) {
      print.error(`Error while sending commands to ${serverId}:`, error);
    } finally {
      print.info(`Closing RCON connection for server ${serverId}`);
      client?.disconnect();
      this.clients.delete(serverId);
    }

    return responses;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default RconSingleton.getInstance();
