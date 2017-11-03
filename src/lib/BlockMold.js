import _findIndex from 'lodash/findIndex';
import _findLastIndex from 'lodash/findLastIndex';

export const blockStatus = [0, 1, 2, 3]
export const moldShape = () => {
  // 0: empty, 1: active, 3: complete
  const moldSelector = [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
    ]
  ]
  const pieceIndex = Math.round(Math.random() * (moldSelector.length - 1))
  const mold = moldSelector[pieceIndex]
  
  return mold
}

export const getBlockSize = (block) => {
  const startInitValue = block.length
  const size = {
    x: {
      start: startInitValue,
      end: 0,
    }
  }
  for (let rows of block) {

    // x.start
    const rowsFirstIndex = _findIndex(rows, v => v === 1)
    if (rowsFirstIndex !== -1 && rowsFirstIndex < size.x.start) {
      size.x.start = rowsFirstIndex
    }

    // x.end
    const rowsLastIndex = _findLastIndex(rows, v => v === 1)
    if (rowsLastIndex > size.x.end) {
      size.x.end = rowsLastIndex
    }
  }
  return size
}