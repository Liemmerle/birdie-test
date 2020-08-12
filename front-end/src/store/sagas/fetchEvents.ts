import { takeEvery, put } from 'redux-saga/effects';
import { FETCH_EVENTS } from './types';
import { Action } from 'redux';
import { eventsReceived } from '../actions/events';

export function* fetchEvents(action: Action & { date: Date; careRecipient: string }) {
  let dateEnd = new Date(action.date);
  dateEnd.setDate(dateEnd.getDate() + 1);

  const result = yield fetch(`${
    process.env.REACT_APP_BACK_END_ADDRESS}${
    process.env.REACT_APP_BACK_END_PORT !== '80'
      ? ':' + process.env.REACT_APP_BACK_END_PORT
      : ''
    }/events/${action.careRecipient}/${action.date.getTime()}/${dateEnd.getTime()}`)
    .then(res => res.json());
  yield put(eventsReceived(action.careRecipient, action.date, result.events));
}

export function* watchEventFetch() {
  yield takeEvery(FETCH_EVENTS, fetchEvents);
}