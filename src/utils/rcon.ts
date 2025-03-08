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

  private async createClient(serverId: string): Promise<Rcon | null> {
    const rcon_host = process.env[`${serverId}_rcon_host`];
    const rcon_port = Number(process.env[`${serverId}_rcon_port`]);
    const rcon_password = process.env[`${serverId}_rcon_password`];

    if (!rcon_host || !rcon_port || !rcon_password) {
      print.error(`❌ RCON details not found for ${serverId}`);
      return null;
    }

    const client = new Rcon(rcon_host, rcon_port, rcon_password);

    try {
      print.info(`🔌 Connecting to RCON server ${serverId}`);
      await client.connect();
      print.info(`✅ Connected to RCON server ${serverId}`);
      this.clients.set(serverId, client); // Store only if connection succeeds
      return client;
    } catch (error) {
      print.error(`❌ Failed to connect to RCON server ${serverId}:`, error);
      return null;
    }
  }

  public async sendCommands(
    serverId: string,
    commands: string[]
  ): Promise<string[]> {
    print.info(`📡 Sending commands to server ${serverId}:`, commands);

    let client =
      this.clients.get(serverId) || (await this.createClient(serverId));
    const responses: string[] = [];

    if (!client) {
      print.error(
        `❌ Skipping commands for ${serverId} because RCON connection failed.`
      );
      return responses; // Return an empty response list instead of crashing
    }

    try {
      for (const command of commands) {
        print.info(`➡️ Sending command: ${command}`);
        const response = await client.send(command);
        print.info(`✅ Response: ${response}`);
        responses.push(`${response}`);
      }
    } catch (error) {
      print.error(`❌ Error while sending commands to ${serverId}:`, error);
    } finally {
      print.info(`🔌 Closing RCON connection for ${serverId}`);
      client.disconnect();
      this.clients.delete(serverId);
    }

    return responses;
  }
}

export default RconSingleton.getInstance();
