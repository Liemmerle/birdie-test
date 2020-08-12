import { takeEvery, put } from 'redux-saga/effects';
import { FETCH_CARE_RECIPIENTS } from './types';
import { careRecipientsReceived } from '../actions/careRecipientsReceived';

export function* fetchCareRecipients() {
  const result = yield fetch(`${process.env.REACT_APP_BACK_END_ADDRESS}${
    process.env.REACT_APP_BACK_END_PORT !== '80'
      ? ':' + process.env.REACT_APP_BACK_END_PORT
      : ''}/care_recipients`)
    .then(res => res.json());
  yield put(careRecipientsReceived(result.careRecipients));
}

export function* watchCareRecipientsFetch() {
  yield takeEvery(FETCH_CARE_RECIPIENTS, fetchCareRecipients);
}