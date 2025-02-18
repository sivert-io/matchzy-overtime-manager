import express from "express";
import bodyParser from "body-parser";

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
  const event = req.body;
  console.log("Received event:", event);

  if (event.event === "series_end") {
    console.log("Match finished. Resetting state.");
    matchState.overtimeCount = 0;
  }

  if (event.event === "overtime_start") {
    matchState.overtimeCount++;
    console.log(`Overtime started! Count: ${matchState.overtimeCount}`);

    if (matchState.overtimeCount > matchState.maxOvertimes) {
      console.log("Max overtimes reached. Forcing match end.");
      endMatch();
    }
  }

  res.sendStatus(200);
});

function endMatch() {
  console.log("Triggering match force end (this logic can be expanded)");
  // Implement logic to force end match here
}

app.listen(PORT, () => {
  console.log(`MatchZy server is running on port ${PORT}`);
});
