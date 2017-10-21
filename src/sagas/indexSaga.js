import { fork } from 'redux-saga/effects';
import testSaga from "./testSaga";

const sagas = [
  ...testSaga,
]

export default function* root() {
  yield sagas.map(saga => fork(saga));
}