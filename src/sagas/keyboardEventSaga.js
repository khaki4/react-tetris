import { put, call, select, throttle, take } from 'redux-saga/effects';
import * as fromGameBoard from '../reducers/gameBoard';
import { getBlockSize } from '../lib/BlockMold'
import { keyDirection } from '../lib/Constants'

function* workMoveFlow(action) {
  const getBoard = (state) => state.play.board
  const board = yield select(getBoard)
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
  watchTransFormBlock,
]