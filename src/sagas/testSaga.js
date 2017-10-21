import { all, fork, call, put, take } from 'redux-saga/effects';

function* helloSaga() {
  yield console.log('hello saga')
}

export default [
  helloSaga,
]