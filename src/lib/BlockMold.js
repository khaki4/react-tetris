import _findIndex from 'lodash/findIndex';
import _findLastIndex from 'lodash/findLastIndex';

export const blockStatus = [0, 1, 2, 3]
export const moldShape = () => {
  // 0: empty, 1: active, 2: rotate, 3: complete
  const moldSelector = [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 0, 0],
      [0, 0, 1],
      [1, 1, 1],
    ],
    [
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
    ]
  ]
  const pieceIndex = Math.round(Math.random() * (moldSelector.length - 1))
  const mold = moldSelector[pieceIndex]
  
  return mold
}

export const getBlockSize = (block) => {
  const startInitValueX = block[0].length
  const startInitValueY = block.length
  const size = {
    x: {
      start: startInitValueX,
      end: 0,
    },
    y: {
      start: startInitValueY,
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
  
  const blockAboutColumn = block.map(rows => {
    return rows.some(sector => sector === blockStatus[1])
  })
  const columnsFirstIndex = _findIndex(blockAboutColumn, v => v)
  const columnsLastIndex = _findLastIndex(blockAboutColumn, v => v)
  size.y = {
    start: columnsFirstIndex,
    end: columnsLastIndex,
  }
  return size
}