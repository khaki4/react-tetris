import React, { PureComponent } from 'react';
import { blockStatus } from '../lib/BlockMold'

class NextBlockSection extends PureComponent {
  render() {
    return (
      <div className="nextblocksection">
        <h2>Next Block</h2>
        <div className="cf nextblocksection_nextblock" style={{width: this.props.nextBlock.length * 20}}>
          {this.props.nextBlock.map((rows, i) => {
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
}

export default NextBlockSection