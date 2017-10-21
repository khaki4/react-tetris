// Actions
export const MOVE_TICK = 'MOVE_TICK'

// Action Creators
export const moveTick = (position) => ({type: MOVE_TICK, payload: position})


// reducer
export default (() => {
  const initState = {
    position: {
      top: 0
    }
  }
  const _moveTick = (state, action) => {
    return {
      ...state,
      position: {
        top: state.position.top + 50
      }
    }
  }
  return (state = initState, action) => {
    switch (action.type) {
      case MOVE_TICK:
        return _moveTick(state, action)
      default:
        return state
    }
  }
})()
