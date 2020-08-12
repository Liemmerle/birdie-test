import { CareEvent } from '@App/store/reducers/index';
import { SELECT_EVENTS } from '../actions/index';
import initialState from './initialState';
import { Action } from 'redux';

export function setSelectEventsReducer(
  state: CareEvent[] | null | null = initialState.seletedEvents,
  action: Action & { selectedEvents: CareEvent[] | null }) {

  if (action.type === SELECT_EVENTS) {
    return action.selectedEvents;
  }

  return state;
}