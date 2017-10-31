import React, { PureComponent } from "react";
import { connect } from "react-redux";
import BlockItemManager from "./BlockItemManager";
import GameBoard from "./GameBoard";
import { getTransformedMoldShape, setMoldShape, moveTick, setActiveToComplete } from '../reducers/gameBoard'
import { moldShape } from "../lib/BlockMold";

class PlayGround extends PureComponent {
  constructor(props) {
    super(props)
    this.LIMIT_TOP = 18
  }
  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp)
    this.props.setMoldShape(moldShape())
    this.movePieceAuto()
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp)
  }
  movePieceAuto = () => {
    this.MOVE_TICK = setInterval(() => {
      this.props.moveTick()
      if (this.props.position > this.LIMIT_TOP) {
        this.props.setActiveToComplete()
        clearInterval(this.MOVE_TICK)
      }
    }, 300)
  }
  handleKeyUp = (e) => {
    switch (e.key) {
      case 'w':
        this.props.setMoldShape(getTransformedMoldShape(this.props.moldShape))
        break
      default:
        return
    }
  }
  render() {
    return (
      <div className="playGround_wrapper">
        <GameBoard board={this.props.board} />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    moldShape: state.play.moldShape,
    board: state.play.board,
    position: state.play.position,
  }),
  { setMoldShape, moveTick, setActiveToComplete }
)(PlayGround)