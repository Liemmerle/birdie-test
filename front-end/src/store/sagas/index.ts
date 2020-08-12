import { watchCareRecipientsFetch } from './fetchCareRecipient';
import { watchEventFetch } from './fetchEvents';
import { all } from 'redux-saga/effects';

function* initSaga() {
  yield all([
    watchCareRecipientsFetch(),
    watchEventFetch()
  ]);
}

export default initSaga;