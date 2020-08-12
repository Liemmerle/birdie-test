import { SET_CARE_RECIPIENT } from './../actions/index';
import initialState from './initialState';
import { Action } from 'redux';

export function careRecipientReducer(
  state: { name: string, id: string } | null = initialState.careRecipient,
  action: Action & { careRecipient: { name: string, id: string } }) {

  if (action.type === SET_CARE_RECIPIENT) {
    return action.careRecipient;
  }

  return state;
}