import { EVENTS_RECEIVED } from './../actions/index';
import initialState from './initialState';
import { Action } from 'redux';
import { CareEvent } from '.';

export function eventsReceivedReducer(
  state: {
    [keys: string]: {
      [keys: string]: CareEvent[];
    }
  } = initialState.events,
  action: Action & { careRecipient: string, date: Date, events: CareEvent[] }) {

  if (action.type === EVENTS_RECEIVED) {
    let newState = { ...state };

    if (!newState[action.careRecipient]) {
      newState[action.careRecipient] = {};
    }
    newState[action.careRecipient][action.date.toISOString()] = action.events.filter((ev, id, arr) => {
      if (ev.rejected_event_id) {
        return false;
      }
      if (arr.find(ev2 => ev2.rejected_event_id === ev.id)) {
        return false;
      }
      return true;
    }).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    return newState;
  }

  return state;
}