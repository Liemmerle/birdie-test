import { CARE_RECIPIENTS_RECEIVED } from '.';

export function careRecipientsReceived(careRecipients: string[]) {
  return {
    type: CARE_RECIPIENTS_RECEIVED,
    careRecipients,
  };
}
