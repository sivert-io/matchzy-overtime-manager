import { DemoUploadEndedEvent } from "./demo";
import { GoingLiveEvent } from "./live";
import {
  MapPickedEvent,
  MapResultEvent,
  MapVetoedEvent,
  SidePickedEvent,
} from "./map_events";
import { RoundEndEvent } from "./round_events";
import { SeriesEndEvent, SeriesStartEvent } from "./series_events";

export type MatchzyEvent =
  | SeriesStartEvent
  | MapResultEvent
  | SeriesEndEvent
  | SidePickedEvent
  | MapPickedEvent
  | MapVetoedEvent
  | GoingLiveEvent
  | DemoUploadEndedEvent
  | RoundEndEvent;
