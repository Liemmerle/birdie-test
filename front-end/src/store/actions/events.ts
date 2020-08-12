import { EVENTS_RECEIVED } from './index';
import { CareEvent } from '../reducers/index';
import { FETCH_EVENTS } from '../sagas/types';

export function eventsReceived(careRecipient: string, date: Date, events: CareEvent[]) {
  return {
    type: EVENTS_RECEIVED,
    careRecipient,
    date,
    events
  };
}

export function fetchEvents(careRecipient: string, date: Date) {
  return {
    type: FETCH_EVENTS,
    date,
    careRecipient
  };
}