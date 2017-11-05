import React  from "react";
import { blockStatus } from '../lib/BlockMold'
import BoardMask from './BoardMask'

const getSectorClassName = (sector) => {
  if (sector === blockStatus[1]) {
    return 'blockmold_unit filled'
  }
  if (sector === blockStatus[3]) {
    return 'blockmold_unit complete'
  }
  return 'blockmold_unit'
}
const GameBoard = ({ board, scoreBoard }) => {
  return(
    <div className="gameboard_wrapper">
      <BoardMask scoreBoard={scoreBoard} />
      <div className="gameboard">
        {board.map((rows, i) => {
          return rows.map((sector, j) => {
            return (
              <div
                key={i + j}
                className={getSectorClassName(sector)}
              ></div>
            )
          })
        })}
      </div>
    </div>
  )
}

export default GameBoard
