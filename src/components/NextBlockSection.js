import React, { PureComponent } from 'react';
import { blockStatus } from '../lib/BlockMold'

class NextBlockSection extends PureComponent {
  render() {
    return (
      <div className="nextblocksection">
        <h2>Next Block</h2>
        {this.props.nextBlock.map((rows, i) => {
          const addedBlankRows = [blockStatus[0], ...rows]
          return addedBlankRows.map((sector, j) => {
            return (
              <div
                key={i + j}
                className={`blockmold_unit ${sector === blockStatus[1] || sector === blockStatus[3]? 'filled' : ''}`}
              ></div>
            )
          })
        })}
      </div>
    )
  }
}

export default NextBlockSection