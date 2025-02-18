import express from "express";
import bodyParser from "body-parser";
import { MatchzyEvent } from "./types/matchzy";
import { createLogger, Logger as print } from "lovely-logs";

createLogger({
  platform: "console",
  timestampEnabled: true,
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Match state tracking
let matchState = {
  overtimeCount: 0,
  maxOvertimes: 1, // Change this to limit how many overtimes are allowed
};

// Route to handle get5 events
app.post("/events", (req, res) => {
  const event: MatchzyEvent = req.body;
  print.info("Received event:", event);

  if (event.event === "series_end") {
    print.info("Match finished. Resetting state.");
    matchState.overtimeCount = 0;
  }

  if (event.event === "round_end") {
    matchState.overtimeCount++;
    print.info(`Overtime started! Count: ${matchState.overtimeCount}`);

    if (matchState.overtimeCount > matchState.maxOvertimes) {
      print.info("Max overtimes reached. Forcing match end.");
      endMatch();
    }
  }

  res.sendStatus(200);
});

function endMatch() {
  print.info("Triggering match force end (this logic can be expanded)");
  // Implement logic to force end match here
}

app.listen(PORT, () => {
  print.success(`MOM is running on port ${PORT}`);
});
