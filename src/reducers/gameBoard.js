import { createSelector } from 'reselect';
import _flatten from 'lodash/flatten'
import _chunk from 'lodash/chunk'
import { blockStatus } from '../lib/BlockMold'

// Actions
export const MOVE_TICK = 'MOVE_TICK'
export const SET_BLOCK_INIT_POSITION = 'SET_BLOCK_INIT_POSITION'
export const SET_MOLD_SHAPE = 'SET_MOLD_SHAPE'
export const SET_ACTIVE_TO_COMPLETE = 'SET_ACTIVE_TO_COMPLETE'
export const CHECK_ENABLE_TO_MOVE_BLOCK = 'CHECK_ENABLE_TO_MOVE_BLOCK'

// Action Creators
export const moveTick = () => ({type: MOVE_TICK})
export const setBlockInitPosition = () => ({type: SET_BLOCK_INIT_POSITION})
export const setMoldShape = (moldShape) => ({type: SET_MOLD_SHAPE, payload: moldShape})
export const setActiveToComplete = () => ({type: SET_ACTIVE_TO_COMPLETE})
export const checkEnableToMoveBlock = (currentBoard, direction) => ({type:CHECK_ENABLE_TO_MOVE_BLOCK, payload: currentBoard, direction})

// reducer
export default (() => {
  const initBoard = _chunk(new Array(200).fill(0), 10)
  const initState = {
    position: {
      x: 3,
      y: 0,
    },
    board: initBoard,
    moldShape: [],
  }
  const _moveTick = (state, action) => {
    const getNextBoardState = (currentBoard) => {
      const copiedBoard = _chunk([..._flatten(currentBoard)], 10)
      const maxIndex = copiedBoard.length - 1
      let yPosition = state.position.y
      currentBoard.forEach((rows, i) => {
        if (i >= maxIndex) return
        rows.forEach((currentSector, j) => {
          const nextSector = copiedBoard[i + 1][j]
          
          if (currentSector !== blockStatus[3] && nextSector !== blockStatus[3]) {
            copiedBoard[i + 1][j] = currentSector
          }
          if (currentSector === blockStatus[1]) {
            yPosition = i + 1
          }
        })
      })
      return {
        board: copiedBoard,
        position: {
          ...state.position,
          y: yPosition,
        },
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
      position: initState.position.y,
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
  const arrLen = preMoldShape.length
  const copiedMoldShape = _chunk(_flatten(preMoldShape), 4)
  
  for (let i = 0; i < arrLen; i++) {
    for (let j = 0; j < arrLen; j++) {
      copiedMoldShape[j][arrLen -1 - i] = preMoldShape[i][j]
    }
  }
  return copiedMoldShape
}

export const getNextStepState = (() => {
  const gameBoardSelector = currentGameBoard => currentGameBoard
  const directionSelector = (currentGameBoard, direction) => direction
  return createSelector(
    gameBoardSelector,
    directionSelector,
    (currentGameBoard, direction) => {
      switch (direction) {
        case 'down':
          const enableToMove = (currentGameBoard) => {
            const copiedBoard = _chunk([..._flatten(currentGameBoard)], 10)
            const maxIndex = copiedBoard.length - 1
            let isLimitedEnd = false
            currentGameBoard.forEach((rows, i) => {
              if (i >= maxIndex) return
              rows.forEach((currentSector, j) => {
                const nextSector = copiedBoard[i + 1][j]
                if (currentSector === blockStatus[1] && nextSector === blockStatus[3]) { // 현재 active sector &&
                  isLimitedEnd = true
                }
              })
            })
            return isLimitedEnd
          }
          return enableToMove(currentGameBoard)
        default:
          return currentGameBoard
      }
    }
  )
})()


