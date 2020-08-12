import { CareEvent } from '@App/store/reducers/index';
import { SELECT_EVENTS } from '.';

export function setSelectedEvents(selectedEvents: CareEvent[] | null) {
  return {
    type: SELECT_EVENTS,
    selectedEvents
  };
}
