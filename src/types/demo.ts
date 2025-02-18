export type DemoUploadEndedEvent = {
  event: "demo_upload_ended";
  matchid: number;
  map_number: number;
  filename: string;
  success: boolean;
};
