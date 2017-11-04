export const keyDirection = (() => {
  const directionArray = [87, 83, 65, 68] // up, down, left, right
  return {
    'UP': directionArray[0],
    'DOWN': directionArray[1],
    'LEFT': directionArray[2],
    'RIGHT': directionArray[3],
  }
})()

export const GAMEBOARD_X_LENGTH = 10
export const GAMEBOARD_Y_LENGTH = 20
export const TICK_TIME_INTERVAL = 1000
export const MASK_HEIGHT = 5