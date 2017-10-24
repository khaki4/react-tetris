import React, { PureComponent } from "react";
import { connect } from "react-redux";
import BlockItem from "./BlockItem";
import { moveTick, setBlockInitPosition, setMoldShape } from '../reducers/gameBoard'

const moldShape = () => {
  const moldSelector = [
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
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
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ]
  ]
  const pieceIndex = Math.round(Math.random() * (moldSelector.length - 1))
  const mold = moldSelector[pieceIndex]

  return mold
}

class BlockItemManager extends PureComponent {
  constructor(props) {
    super(props)
    this.LIMIT_TOP = 400
    this.MOVE_TICK = null
  }
  componentDidMount() {
    this.props.setMoldShape(moldShape())
    // this.movePieceAuto()
  }
  
  restartBlock = () => {
    this.props.setMoldShape(moldShape())
    this.props.setBlockInitPosition()
    this.movePieceAuto()
  }
  movePieceAuto = () => {
    this.MOVE_TICK = setInterval(() => {
      this.props.moveTick()
      if (this.props.position.top > this.LIMIT_TOP) {
        clearInterval(this.MOVE_TICK)
        this.restartBlock()
      }
    }, 300)
  }
  render() {
    return (
      <div>
        <BlockItem
          position={this.props.position}
        />
      </div>
    )
  }

}

export default connect(
  (state) => ({
    position: state.play.position
  }),
  { moveTick, setBlockInitPosition, setMoldShape }
)(BlockItemManager)