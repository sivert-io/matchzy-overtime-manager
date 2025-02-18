export const RoundEndReasons: Record<number, string> = {
  0x0: "Unknown",
  0x1: "Target Bombed",
  0x4: "Terrorists Escaped",
  0x5: "CTs Prevent Escape",
  0x6: "Escaping Terrorists Neutralized",
  0x7: "Bomb Defused",
  0x8: "CTs Win",
  0x9: "Terrorists Win",
  0xa: "Round Draw",
  0xb: "All Hostages Rescued",
  0xc: "Target Saved",
  0xd: "Hostages Not Rescued",
  0xe: "Terrorists Not Escaped",
  0x10: "Game Commencing",
  0x11: "Terrorists Surrender", // this also triggers match cancelled
  0x12: "CTs Surrender", // this also triggers match cancelled
  0x13: "Terrorists Planted",
  0x14: "CTs Reached Hostage",
  0x15: "Survival Win",
  0x16: "Survival Draw",
};
