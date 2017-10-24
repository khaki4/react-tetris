import React, { PureComponent } from "react";
import { connect } from "react-redux";
import BlockItemManager from "./BlockItemManager";
import GameBoard from "./GameBoard";
import { getTransformedMoldShape, setMoldShape } from '../reducers/gameBoard'
import { moldShape } from "../lib/BlockMold";

class PlayGround extends PureComponent {
  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp)
    this.props.setMoldShape(moldShape())
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp)
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
  }),
  { setMoldShape }
)(PlayGround)