import express from "express";
import bodyParser from "body-parser";
import { MatchzyEvent } from "./types/matchzy";
import { createLogger, Logger as print } from "lovely-logs";
import { handleRoundEndEvent } from "./utils/match";
import { sendWebhook } from "./utils/webhook";
import { calculateTeamDamage } from "./utils/tools";
import { sendCommand } from "./utils/rcon";
import { matchzy_commands, tv_commands } from "./data/commands_to_send_server";

createLogger({
  platform: "console",
  timestampEnabled: true,
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Health check route
app.get("/events" || "/", (req, res) => {
  res.send("I am alive");
});

// Route to handle get5 events
app.post("/events", (req, res) => {
  const event: MatchzyEvent = req.body;
  print.info("Received event:", event.event);

  print.info(req.headers);
  // Get IP of the server that sent the event
  const serverId = req.headers["server-id"] as string;

  if (event.event === "round_end") {
    handleRoundEndEvent(serverId, event);
  }

  if (event.event === "map_result") {
    const team1Damage = calculateTeamDamage(event.team1);
    const team2Damage = calculateTeamDamage(event.team2);
    sendWebhook({
      team1: event.team1.name,
      team2: event.team2.name,
      roundsWon1: event.team1.score,
      roundsWon2: event.team2.score,
      totalDamage1: team1Damage,
      totalDamage2: team2Damage,
      winner: event[event.winner.team].name,
    });
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.clear();
  print.success(`MOM is running on port ${PORT}`);
});

// Interval that pings all servers every 10 minutes and sends rcon commands
setInterval(() => {
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
}, 600000);
