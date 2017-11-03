import { call, put, take, select, throttle } from 'redux-saga/effects';
import * as fromGameBoard from '../reducers/gameBoard';
import { getBlockSize } from '../lib/BlockMold'

function* moveHorizontalBlock(action) {
  yield console.log('test!!')
  yield put(fromGameBoard.moveBlock(action.payload))
}

function* workMoveFlow(action) {
  const getBoard = (state) => state.play.board
  const board = yield select(getBoard)
  const enableToMoveBlock = yield fromGameBoard.isEnableToMoveBlock(board, action.payload);
  console.log(enableToMoveBlock)
  if (!enableToMoveBlock) return;
  yield put(fromGameBoard.moveBlock(action.payload));
  yield put(fromGameBoard.clearActiveBlock())
  yield put(fromGameBoard.renderCurrentBoard())
}

function* watchKeyBoardMoveEvent() {
  yield throttle(100, fromGameBoard.OPERATE_MOVE_FLOW, workMoveFlow)
}

function* workTransformFlow() {
  const moldShape = yield select(state => state.play.moldShape)
  const transformedMoldShape = yield fromGameBoard.getTransformedMoldShape(moldShape)
  const moldSize = yield getBlockSize(transformedMoldShape)
  const board = yield select(state => state.play.board)
  const xPosition = yield select(state => state.play.position.x)
  const enableToMoveBlock = yield fromGameBoard.isEnableToMoveBlock(board, 87, moldSize, xPosition);
  if (!enableToMoveBlock) return;
  yield put(fromGameBoard.setMoldShape(transformedMoldShape));
  yield put(fromGameBoard.clearActiveBlock())
  yield put(fromGameBoard.renderCurrentBoard())
}
function* watchTransFormBlock() {
  yield throttle(100, fromGameBoard.OPERATE_TRANSFORM_FLOW, workTransformFlow)
}

export default [
  watchKeyBoardMoveEvent,
  watchTransFormBlock,
]