export const keyDirection = (() => {
  const directionArray = [87, 83, 65, 68, 32] // up, down, left, right, quick down
  return {
    'UP': directionArray[0],
    'DOWN': directionArray[1],
    'LEFT': directionArray[2],
    'RIGHT': directionArray[3],
    'QUICK_DOWN': directionArray[4],
  }
})()

export const MASK_HEIGHT = 4
export const TICK_TIME_INTERVAL = 1000
export const GAMEBOARD_X_LENGTH = 10
export const GAMEBOARD_Y_LENGTH = 20 + MASK_HEIGHT
