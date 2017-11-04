import React from 'react';

export default ({ scoreBoard }) => {
  return (
    <div className="boardMask">
      <h2>Score: {scoreBoard.score}</h2>
      <h2>Level: {scoreBoard.level}</h2>
    </div>
  )
}