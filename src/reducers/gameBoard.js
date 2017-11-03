import { createSelector } from 'reselect';
import _flatten from 'lodash/flatten'
import _chunk from 'lodash/chunk'
import _isNil from 'lodash/isNil'
import _remove from 'lodash/remove'
import _pull from 'lodash/pull'
import { blockStatus } from '../lib/BlockMold'

// Actions
export const MOVE_TICK = 'MOVE_TICK'
export const SET_BLOCK_INIT_POSITION = 'SET_BLOCK_INIT_POSITION'
export const SET_MOLD_SHAPE = 'SET_MOLD_SHAPE'
export const SET_ACTIVE_TO_COMPLETE = 'SET_ACTIVE_TO_COMPLETE'
export const CHECK_ENABLE_TO_MOVE_BLOCK = 'CHECK_ENABLE_TO_MOVE_BLOCK'
export const CLEAR_ACTIVE_BLOCK = 'CLEAR_ACTIVE_BLOCK'
export const MOVE_BLOCK = 'MOVE_BLOCK'
export const BREAK_BLOCKS = 'BREAK_BLOCKS'

// Action Creators
export const moveTick = () => ({type: MOVE_TICK})
export const setBlockInitPosition = () => ({type: SET_BLOCK_INIT_POSITION})
export const setMoldShape = (moldShape) => ({type: SET_MOLD_SHAPE, payload: moldShape})
export const setActiveToComplete = () => ({type: SET_ACTIVE_TO_COMPLETE})
export const checkEnableToMoveBlock = (currentBoard, direction) => ({type:CHECK_ENABLE_TO_MOVE_BLOCK, payload: currentBoard, direction})
export const clearActiveBlock = () => ({type: CLEAR_ACTIVE_BLOCK })
export const moveBlock = (direction) => ({type: MOVE_BLOCK, payload: direction})
export const breakBlocks = () => ({type: BREAK_BLOCKS})

// reducer
export default (() => {
  const initBoard = _chunk(new Array(400).fill(0), 10)
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
          // 게임 보드 밖의 값을 조회할 때
          if (_isNil(preBoard[i + position.y]) || _isNil(preBoard[i + position.y][j + position.x])) return
          // 블록이 게임 보드 밖으로 나갔을 때
          if (sector === blockStatus[1] && _isNil(preBoard[i + position.y][j + position.x])) {
            console.log('block is outside!!!')
            return
          }
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
  const _setMoldShape = (state, action) => {
    return {
      ...state,
      moldShape: action.payload,
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
  const _moveBlock = (state, direction) => {
    const directionArray = [87, 65, 83, 68] // up, left, down, right
    switch (direction) {
      case directionArray[1]:
        return {
          ...state,
          position: {
            ...state.position,
            x: state.position.x - 1,
          }
        }
      case directionArray[2]:
        return {
          ...state,
          position: {
            ...state.position,
            y: state.position.y + 1,
          }
        }
      case directionArray[3]:
        return {
          ...state,
          position: {
            ...state.position,
            x: state.position.x + 1,
          }
        }
      default:
        return state
    }
  }
  const _breakBlocks = (state, action) => {
    const getBokenBoard = (currenstBoard) => {
      return currenstBoard.map((rows, i) => {
        return rows.every(sector => {
          return sector === blockStatus[3]
        })
      })
    }
    const fulledIndex = getBokenBoard(state.board)
    const copiedBoard = [...state.board]
    const fulledRows = fulledIndex.filter(item => item)
    const fulledRowsRemovedBoard = _remove(copiedBoard, (item, index) => !fulledIndex[index])

    const emptyRow = fulledRows.map(item => new Array(10).fill(0))
    const nextBoard = [...emptyRow, ...fulledRowsRemovedBoard]
    return {
      ...state,
      board: nextBoard
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
      case CLEAR_ACTIVE_BLOCK:
        return _clearActiveBlock(state, action)
      case MOVE_BLOCK:
        return _moveBlock(state, action.payload)
      case BREAK_BLOCKS:
        return _breakBlocks(state, action)
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

export const isEnableToMoveBlock = (currentGameBoard, direction, moldSize, xPosition) => {
  const enableToMove = (currentGameBoard, coodinationAdder) => {
    const copiedBoard =[...currentGameBoard]
    const maxIndex = copiedBoard.length - 1
    const xAxisLength = copiedBoard[0].length
    let isLimitedEnd = true
    currentGameBoard.forEach((rows, i) => {
      rows.forEach((currentSector, j) => {
        const isNilNextBlockStatus = _isNil(copiedBoard[i + coodinationAdder.y])
        if (i > maxIndex) {
          isLimitedEnd = false
          return
        }
        // 횡방향으로 이동시 게임 보드를 넘어가는지 체크
        if (
          currentSector === blockStatus[1]
          && (j + coodinationAdder.x < 0 || j + coodinationAdder.x >= xAxisLength)
        ) {
          isLimitedEnd = false
          return
        }
        if (currentSector === blockStatus[1] && isNilNextBlockStatus) {
          isLimitedEnd = false
          return
        }
        if (isNilNextBlockStatus) return
        const nextSector = copiedBoard[i + coodinationAdder.y][j + coodinationAdder.x]
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
  let coodinationAdder = {}
  switch (direction) {
    case 'down':
      coodinationAdder = {
        x: 0,
        y: 1,
      }
      return enableToMove(currentGameBoard, coodinationAdder)
    case 'left':
      coodinationAdder = {
        x: -1,
        y: 0,
      }
      return enableToMove(currentGameBoard, coodinationAdder)
    case 'right':
      coodinationAdder = {
        x: 1,
        y: 0,
      }
      return enableToMove(currentGameBoard, coodinationAdder)
    case 'up':
      if (xPosition === undefined || xPosition === null) return
      const enAbleToMoveAboutStart = xPosition + moldSize.x.start > -1
      const enAbleToMoveAboutEnd = xPosition + moldSize.x.end < currentGameBoard[0].length
      return enAbleToMoveAboutStart && enAbleToMoveAboutEnd
    default:
      return true
  }
}


