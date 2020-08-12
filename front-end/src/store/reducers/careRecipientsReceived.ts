import { CARE_RECIPIENTS_RECEIVED } from './../actions/index';
import initialState from './initialState';
import { Action } from 'redux';

export function careRecipientReceivedReducer(
  state: { name: string, id: string }[] | null = initialState.careRecipients,
  action: Action & { careRecipients: { name: string, id: string }[] }) {

  if (action.type === CARE_RECIPIENTS_RECEIVED) {
    return action.careRecipients;
  }

  return state;
}