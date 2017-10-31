import reducer, * as fromGameBoard from '../gameBoard'
import * as fromBlockMold from '../../lib/BlockMold'
import _chunk from 'lodash/chunk'

describe('gameBoard Test', () => {
  const initBoard = _chunk(new Array(200).fill(0), 10)
  const expectedBoard = _chunk(new Array(200).fill(0), 10)
  const initState = {
    position: 0,
    board: initBoard,
    moldShape: [],
  }
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
})