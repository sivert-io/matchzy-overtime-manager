import express from "express";
import bodyParser from "body-parser";
import { MatchzyEvent } from "./types/matchzy";
import { createLogger, Logger as print } from "lovely-logs";
import { handleRoundEndEvent } from "./utils/match";

createLogger({
  platform: "console",
  timestampEnabled: true,
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Health check route
app.get("/", (req, res) => {
  res.send("I am alive");
});

// Route to handle get5 events
app.post("/events", (req, res) => {
  const event: MatchzyEvent = req.body;
  print.info("Received event:", event.event);

  // Get IP of the server that sent the event
  const serverId = req.headers["server-id"] as string;
  print.info(`Event received from server: ${serverId}`);

  if (event.event === "round_end") {
    handleRoundEndEvent(serverId, event);
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  print.success(`MOM is running on port ${PORT}`);
});
