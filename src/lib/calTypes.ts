interface Event {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  creator: Creator;
  organizer: Organizer;
  start: Start;
  end: End;
  recurringEventId: string;
  originalStartTime: OriginalStartTime;
  iCalUID: string;
  sequence: number;
  guestsCanModify: boolean;
  reminders: Reminders;
  eventType: string;
}
interface Creator {
  email: string;
  self: boolean;
}
interface Organizer {
  email: string;
  self: boolean;
}
interface Start {
  dateTime: string;
  timeZone: string;
}
interface End {
  dateTime: string;
  timeZone: string;
}
interface OriginalStartTime {
  dateTime: string;
  timeZone: string;
}
interface Reminders {
  useDefault: boolean;
}

export type { Event };
