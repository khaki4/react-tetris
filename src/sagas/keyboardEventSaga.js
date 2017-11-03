import { call, put, take, takeLatest } from 'redux-saga/effects';
import * as fromGameBoard from '../reducers/gameBoard';

function* moveHorizontalBlock(action) {
  yield put(fromGameBoard.moveBlock(action.payload))
}

function* watchKeyBoardMoveEvent() {
  const action = yield takeLatest(fromGameBoard.MOVE_BLOCK)
  yield call(moveHorizontalBlock, action)
}

export default [
  watchKeyBoardMoveEvent,
]