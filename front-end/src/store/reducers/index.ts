import { combineReducers } from 'redux';
import { careRecipientReducer } from './careRecipient';
import { careRecipientReceivedReducer } from './careRecipientsReceived';
import { eventsReceivedReducer } from './eventsReceived';
import { setSelectEventsReducer } from './selectedEvents';

export type CareEvent = {
  payload: object;
  alert_id: string;
  task_instance_id: string;
  visit_id: string;
  caregiver_id: string;
  payload_as_text: string;
  rejected_event_id: string;
  observation_event_id: string;
  timestamp: Date;
  id: string;
  event_type: string;
  care_recipient_id: string;
};

export type RootState = Readonly<{
  careRecipient: { name: string, id: string } | null;
  careRecipients: { name: string, id: string }[] | null;
  events: {
    [keys: string]: {
      [keys: string]: CareEvent[];
    }
  };
  selectedEvents: CareEvent[] | null;
}>;

export const rootReducer = combineReducers<RootState>({
  careRecipient: careRecipientReducer,
  careRecipients: careRecipientReceivedReducer,
  events: eventsReceivedReducer,
  selectedEvents: setSelectEventsReducer,
});
