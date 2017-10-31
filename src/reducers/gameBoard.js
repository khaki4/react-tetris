import _flatten from 'lodash/flatten'
import _chunk from 'lodash/chunk'
import { blockStatus } from '../lib/BlockMold'

// Actions
export const MOVE_TICK = 'MOVE_TICK'
export const SET_BLOCK_INIT_POSITION = 'SET_BLOCK_INIT_POSITION'
export const SET_MOLD_SHAPE = 'SET_MOLD_SHAPE'
export const SET_ACTIVE_TO_COMPLETE = 'SET_ACTIVE_TO_COMPLETE'

// Action Creators
export const moveTick = () => ({type: MOVE_TICK})
export const setBlockInitPosition = () => ({type: SET_BLOCK_INIT_POSITION})
export const setMoldShape = (moldShape) => ({type: SET_MOLD_SHAPE, payload: moldShape})
export const setActiveToComplete = () => ({type: SET_ACTIVE_TO_COMPLETE})

// reducer
export default (() => {
  const initBoard = _chunk(new Array(200).fill(0), 10)
  const initState = {
    position: 0,
    board: initBoard,
    moldShape: [],
  }
  const _moveTick = (state, action) => {
    const getNextBoardState = (currentBoard) => {
      const copiedBoard = _chunk([..._flatten(currentBoard)], 10)
      const maxIndex = copiedBoard.length - 1
      let position = state.position
      currentBoard.forEach((rows, i, iArr) => {
        if (i >= maxIndex) return
        rows.forEach((sector, j) => {
          copiedBoard[i + 1][j] = iArr[i][j]
          if (sector) {
            position = i + 1
          }
        })
      })
      return {
        board: copiedBoard,
        position
      }
    }
    const nextBoardState = getNextBoardState(state.board)
    return {
      ...state,
      ...nextBoardState,
    }
  }
  const _restartBlock = (state, action) => {
    return {
      ...state,
      position: {
        top: initState.position.top
      }
    }
  }
  const _updateBoard = (preBoard, moldShape) => {
    const copiedMold = _chunk([..._flatten(moldShape)], 4)
    const halfPositionHelper = 3
    moldShape.forEach((rows, i) => {
      rows.forEach((sector, j)=> {
        preBoard[i][j + halfPositionHelper] = copiedMold[i][j]
      })
    })
    
    return preBoard
  }
  const _setMoldShape = (state, action) => {
    return {
      ...state,
      moldShape: action.payload,
      board: _updateBoard(state.board, action.payload)
    }
  }
  const _setActiveToComplete = (state, action) => {
    const transActiveToComplete = (_gameBoard) => {
      return _gameBoard.map(rows => {
        return rows.map(sector => {
          return sector === blockStatus[1] ? blockStatus[3] : sector
        })
      })
    }
    return {
      ...state,
      board: transActiveToComplete(state.board)
    }
  }
  return (state = initState, action) => {
    switch (action.type) {
      case SET_BLOCK_INIT_POSITION:
        return _restartBlock(state, action)
      case MOVE_TICK:
        return _moveTick(state, action)
      case SET_MOLD_SHAPE:
        return _setMoldShape(state, action)
      case SET_ACTIVE_TO_COMPLETE:
        return _setActiveToComplete(state, action)
      default:
        return state
    }
  }
})()

// selector
export const getTransformedMoldShape = (preMoldShape, action) => {
  const arrLen = preMoldShape.length - 1
  const copiedMoldShape = _chunk(_flatten(preMoldShape), 4)
  
  for (let i = 0; i < arrLen; i++) {
    for (let j = 0; j < arrLen; j++) {
      copiedMoldShape[j][arrLen -1 - i] = preMoldShape[i][j]
    }
  }
  console.log(preMoldShape)
  console.log(copiedMoldShape)
  return copiedMoldShape
}

