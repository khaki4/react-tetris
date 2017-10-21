// Actions
export const MOVE_TICK = 'MOVE_TICK'
export const SET_BLOCK_INIT_POSITION = 'SET_BLOCK_INIT_POSITION'
export const SET_MOLD_SHAPE = 'SET_MOLD_SHAPE'

// Action Creators
export const moveTick = (position) => ({type: MOVE_TICK, payload: position})
export const setBlockInitPosition = () => ({type: SET_BLOCK_INIT_POSITION})
export const setMoldShape = (moldShape) => ({type: SET_MOLD_SHAPE, payload: moldShape})


// reducer
export default (() => {
  const initState = {
    position: {
      top: 0
    },
    moldShape: [],
  }
  const _moveTick = (state, action) => {
    return {
      ...state,
      position: {
        top: state.position.top + 50
      }
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
  const _setMoldShape = (state, action) => {
    return {
      ...state,
      moldShape: action.payload
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
      default:
        return state
    }
  }
})()
