import { fork } from 'redux-saga/effects';
import keyboardEvent from "./keyboardEventSaga";

const sagas = [
  ...keyboardEvent,
]

export default function* root() {
  yield sagas.map(saga => fork(saga));
}