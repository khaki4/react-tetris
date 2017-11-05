import React  from "react";
import { blockStatus } from '../lib/BlockMold'
import BoardMask from './BoardMask'

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
                className={`blockmold_unit ${sector === blockStatus[1] || sector === blockStatus[3]? 'filled' : ''}`}
              ></div>
            )
          })
        })}
      </div>
    </div>
  )
}

export default GameBoard
