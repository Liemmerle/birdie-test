import { SET_CARE_RECIPIENT } from '.';

export function setCareRecipient(careRecipient: { name: string, id: string }) {
  return {
    type: SET_CARE_RECIPIENT,
    careRecipient,
  };
}
