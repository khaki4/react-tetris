import React from 'react'
import { Link } from 'react-router-dom';

const GameEntryPage = () => {
  return(
    <div className="entrypage">
      <div className="ui column centered grid">
        <div className="column centered row">
          <Link to="playground" replace>Play Tetris</Link>
        </div>
      </div>
    </div>
  )
}

export default GameEntryPage

