import axios from "axios";

export type webhookData = {
  team1: string;
  team2: string;
  roundsWon1: number;
  roundsWon2: number;
  totalDamage1: number;
  totalDamage2: number;
  winner: string;
};

export function sendWebhook(data: webhookData) {
  if (!process.env.WEBHOOK_URL) {
    console.error("No webhook URL provided, skipping sending webhook");
    return;
  }

  console.log("Sending webhook with data: ", data);

  const content = {
    embeds: [
      {
        title: `${data.team1} vs. ${data.team2}`,
        color: 16750848,
        fields: [
          {
            name: `🔹 ${data.team1}`,
            value: `**Rounds Won:** ${data.roundsWon1} \n**Total Damage:** ${data.roundsWon1}`,
            inline: true,
          },
          {
            name: `🔸 ${data.team2}`,
            value: `**Rounds Won:** ${data.roundsWon2} \n**Total Damage:** ${data.roundsWon2}`,
            inline: true,
          },
        ],
        footer: {
          text: `🏆 Winner: ${data.winner}`,
        },
      },
    ],
  };

  try {
    axios.post(process.env.WEBHOOK_URL, content);
  } catch (error) {
    console.error("Error sending webhook: ", error);
  }
}
