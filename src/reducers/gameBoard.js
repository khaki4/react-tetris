import { createSelector } from 'reselect';
import _flatten from 'lodash/flatten'
import _chunk from 'lodash/chunk'
import _isNil from 'lodash/isNil'
import { blockStatus } from '../lib/BlockMold'

// Actions
export const MOVE_TICK = 'MOVE_TICK'
export const SET_BLOCK_INIT_POSITION = 'SET_BLOCK_INIT_POSITION'
export const SET_MOLD_SHAPE = 'SET_MOLD_SHAPE'
export const SET_ACTIVE_TO_COMPLETE = 'SET_ACTIVE_TO_COMPLETE'
export const CHECK_ENABLE_TO_MOVE_BLOCK = 'CHECK_ENABLE_TO_MOVE_BLOCK'
export const CLEAR_ACTIVE_BLOCK = 'CLEAR_ACTIVE_BLOCK'

// Action Creators
export const moveTick = () => ({type: MOVE_TICK})
export const setBlockInitPosition = () => ({type: SET_BLOCK_INIT_POSITION})
export const setMoldShape = (moldShape) => ({type: SET_MOLD_SHAPE, payload: moldShape})
export const setActiveToComplete = () => ({type: SET_ACTIVE_TO_COMPLETE})
export const checkEnableToMoveBlock = (currentBoard, direction) => ({type:CHECK_ENABLE_TO_MOVE_BLOCK, payload: currentBoard, direction})
export const clearActiveBlock = () => ({type: CLEAR_ACTIVE_BLOCK })

// reducer
export default (() => {
  const initBoard = _chunk(new Array(100).fill(0), 10)
  const initState = {
    position: {
      x: 3,
      y: 0,
    },
    board: initBoard,
    moldShape: [],
  }
  const _moveTick = (state, action) => {
    const _calNextBoard = (preBoard, moldShape, position) => {
      const copiedMold = _chunk([..._flatten(moldShape)], 4)
      moldShape.forEach((rows, i) => {
        rows.forEach((sector, j)=> {
          // 게임 보드 밖의 값을 조회할때
          if (_isNil(preBoard[i + position.y]) || _isNil(preBoard[i + position.y][j + position.x])) return
          // 블록의 비어있는 부분일 경우 게임보드 업데이트를 하지 않는다.
          if (sector === blockStatus[0]) {
            return
          }
          preBoard[i + position.y][j + position.x] = copiedMold[i][j]
        })
      })

      return preBoard
    }
    const nextBoardState = _calNextBoard(state.board, state.moldShape, state.position)
    return {
      ...state,
      board: nextBoardState,
      position: {
        x: state.position.x,
        y: state.position.y + 1,
      },
    }
  }
  const _restartBlock = (state, action) => {
    return {
      ...state,
      position: {
        ...initState.position
      },
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
  const _clearActiveBlock = (state, action) => {
    const getClearedBoard = (state) => {
      return state.board.map(rows => {
        return rows.map(sector => {
          return sector === blockStatus[1] ? blockStatus[0] : sector
        })
      })
    }
    return {
      ...state,
      board: getClearedBoard(state)
    }
  }
  const _checkEnableToMoveBlock = (state, action) => {

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
      case CLEAR_ACTIVE_BLOCK:
        return _clearActiveBlock(state, action)
      case CHECK_ENABLE_TO_MOVE_BLOCK:
        return _checkEnableToMoveBlock(state, action)
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

export const isEnableToMoveBlock = (currentGameBoard, direction) => {
  switch (direction) {
    case 'down':
      const enableToMove = (currentGameBoard) => {
        const copiedBoard =[...currentGameBoard]
        const maxIndex = copiedBoard.length - 1
        let isLimitedEnd = true
        currentGameBoard.forEach((rows, i) => {
          rows.forEach((currentSector, j) => {
            const isNilNextBlockStatus = _isNil(copiedBoard[i + 1])
            if (i > maxIndex) {
              isLimitedEnd = false
              return
            }
            if (currentSector === blockStatus[1] && isNilNextBlockStatus) {
              isLimitedEnd = false
              return
            }
            if (isNilNextBlockStatus) return
            const nextSector = copiedBoard[i + 1][j]
            const activeBlock = blockStatus[1]
            const completeBlock = blockStatus[3]
            if (currentSector === activeBlock && nextSector === completeBlock) { // 현재 active sector &&
              isLimitedEnd = false
              return
            }
          })
        })
        return isLimitedEnd
      }
      return enableToMove(currentGameBoard)
    default:
      return true
  }
}


