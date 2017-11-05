import React from 'react';
import { MASK_HEIGHT } from '../lib/Constants'

export default ({ scoreBoard }) => {
  return (
    <div className="boardMask" style={{ height: MASK_HEIGHT * 20 }}>
      <h2>Score: {scoreBoard.score}</h2>
      <h2>Level: {scoreBoard.level}</h2>
    </div>
  )
}