import { put, call, select, take, throttle } from 'redux-saga/effects';
import * as fromGameBoard from '../reducers/gameBoard';
import { getBlockSize } from '../lib/BlockMold'
import { keyDirection } from '../lib/Constants'

function* workMoveFlow(action) {
  const board = yield select((state) => state.play.board)
  const enableToMoveBlock = yield fromGameBoard.isEnableToMoveBlock(board, action.payload);
  if (!enableToMoveBlock) return;
  yield put(fromGameBoard.clearActiveBlock())
  yield put(fromGameBoard.moveBlock(action.payload));
  yield put(fromGameBoard.renderCurrentBoard())
}

function* watchKeyBoardMoveEvent() {
  while (true) {
    const action = yield take(fromGameBoard.OPERATE_MOVE_FLOW)
    yield call(workMoveFlow, action)
  }
}

function* workMoveDownQuicklyFlow() {
  while (true) {
    const board = yield select((state) => state.play.board)
    const enableToMoveBlock = yield fromGameBoard.isEnableToMoveBlock(board, keyDirection.DOWN);
    if (!enableToMoveBlock) return;
    yield put(fromGameBoard.clearActiveBlock())
    yield put(fromGameBoard.moveBlock(keyDirection.DOWN));
    yield put(fromGameBoard.renderCurrentBoard())
  }
}
function* watchDownQuicklyEvent() {
  yield throttle(1000, fromGameBoard.MOVE_DOWN_QUICKLY, workMoveDownQuicklyFlow)
}

function* workTransformFlow() {
  const moldShape = yield select(state => state.play.moldShape)
  const transformedMoldShape = yield fromGameBoard.getTransformedMoldShape(moldShape)
  const moldSize = yield getBlockSize(transformedMoldShape)
  const board = yield select(state => state.play.board)
  const position = yield select(state => state.play.position)
  const enableToMoveBlock = yield fromGameBoard.isEnableToMoveBlock(board, keyDirection.UP, moldSize, position, transformedMoldShape);
  yield put(fromGameBoard.clearActiveBlock())
  yield put(fromGameBoard.renderCurrentBoard())
  if (!enableToMoveBlock) return;
  yield put(fromGameBoard.clearActiveBlock())
  yield put(fromGameBoard.setMoldShape(transformedMoldShape));
  yield put(fromGameBoard.renderCurrentBoard())
}
function* watchTransFormBlock() {
  while (true) {
    yield take(fromGameBoard.OPERATE_TRANSFORM_FLOW)
    yield call(workTransformFlow)
  }
}

export default [
  watchKeyBoardMoveEvent,
  watchDownQuicklyEvent,
  watchTransFormBlock,
]