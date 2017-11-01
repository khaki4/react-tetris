import reducer, * as fromGameBoard from '../gameBoard'
import * as fromBlockMold from '../../lib/BlockMold'
import _chunk from 'lodash/chunk'

describe('gameBoard Test', () => {
  let initBoard, expectedBoard, initState;
  beforeEach(() => {
    initBoard = _chunk(new Array(200).fill(0), 10)
    expectedBoard = _chunk(new Array(200).fill(0), 10)
    initState = {
      position: 0,
      board: initBoard,
      moldShape: [],
    }
  })
  afterEach(() => {
    initBoard = _chunk(new Array(200).fill(0), 10)
    expectedBoard = _chunk(new Array(200).fill(0), 10)
    initState = {
      position: 0,
      board: initBoard,
      moldShape: [],
    }
  })

  it('setActiveToComplete: active 블록은 complete 블록으로 바뀌어야 한다', () => {
    initBoard[19][0] = fromBlockMold.blockStatus[1]
    initBoard[19][1] = fromBlockMold.blockStatus[1]
    initBoard[19][1] = fromBlockMold.blockStatus[1]
    expectedBoard[19][0] = fromBlockMold.blockStatus[3]
    expectedBoard[19][1] = fromBlockMold.blockStatus[3]
    expectedBoard[19][1] = fromBlockMold.blockStatus[3]
    expect(reducer(initState, fromGameBoard.setActiveToComplete(initBoard)))
      .toEqual({
        ...initState,
        board: expectedBoard,
      })
  })

  it('checkEnableToMoveBlock: 블록이 이동 한 후 complete 블록과 겹치치 않으면 isLimitedEnd false 반환 해야 한다', () => {
    initBoard[17][0] = fromBlockMold.blockStatus[1]
    initBoard[17][1] = fromBlockMold.blockStatus[1]
    initBoard[17][2] = fromBlockMold.blockStatus[1]
    initBoard[19][0] = fromBlockMold.blockStatus[3]
    initBoard[19][1] = fromBlockMold.blockStatus[3]
    initBoard[19][2] = fromBlockMold.blockStatus[3]

    expect(fromGameBoard.getNextStepState(initBoard, 'down'))
      .toEqual(false)
  })
  it('checkEnableToMoveBlock: 블록이 이동 한 후 complete 블록과 겹쳐지면 isLimitedEnd true를 반환 해야 한다', () => {
    initBoard[18][0] = fromBlockMold.blockStatus[1]
    initBoard[18][1] = fromBlockMold.blockStatus[1]
    initBoard[18][2] = fromBlockMold.blockStatus[1]
    initBoard[19][0] = fromBlockMold.blockStatus[3]
    initBoard[19][1] = fromBlockMold.blockStatus[3]
    initBoard[19][2] = fromBlockMold.blockStatus[3]

    expect(fromGameBoard.getNextStepState(initBoard, 'down'))
      .toEqual(true)
  })
  describe('블록이 회전 되어야 한다', () => {
    const beforeBlock = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ]
    const afterBlock = [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ]
    const beforeBlock2 = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ]
    const afterBlock2 = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ]
    const beforeBlock3 = [
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
    ]
    const afterBlock3 = [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ]
    const beforeBlock4 = [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ]
    const afterBlock4 = [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ]
    it('test1', () => {
      expect(fromGameBoard.getTransformedMoldShape(beforeBlock))
        .toEqual(afterBlock)
    })
    it('test2', () => {
      expect(fromGameBoard.getTransformedMoldShape(beforeBlock2))
        .toEqual(afterBlock2)
    })
    it('test3', () => {
      expect(fromGameBoard.getTransformedMoldShape(beforeBlock3))
        .toEqual(afterBlock3)
    })
    it('test4', () => {
      expect(fromGameBoard.getTransformedMoldShape(beforeBlock4))
        .toEqual(afterBlock4)
    })
  })
  it('MOVE_TICK 한칸 내려온 모습이 돼야한다', () => {
    const initBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    const nextBoard =  [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    expect(reducer({...initState, board: initBoard}, fromGameBoard.moveTick()).board)
      .toEqual(nextBoard)
  })
})