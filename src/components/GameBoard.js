import React from "react";
import { connect } from "react-redux";

const GameBoard = ({ board }) => {
  return(
    <div className="gameboard">
      {board.map((rows, i) => {
        return rows.map((sector, j) => {
          return <div key={i + j} className={`blockmold_unit ${sector ? 'filled' : ''}`}></div>
        })
      })}
    </div>
  )
}

export default GameBoard