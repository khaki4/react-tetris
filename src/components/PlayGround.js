import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import GameBoard from './GameBoard';
import { getBlockSize } from '../lib/BlockMold';
import {
  getTransformedMoldShape,
  setMoldShape,
  moveTick,
  setActiveToComplete,
  setBlockInitPosition,
  clearActiveBlock,
  isEnableToMoveBlock,
  moveBlock,
  breakBlocks,
  checkEnableToMove,
  operateMoveFlow,
  operateTransformFlow,
} from '../reducers/gameBoard';
import { moldShape } from '../lib/BlockMold';

class PlayGround extends PureComponent {
  constructor(props) {
    super(props);
    this.LIMIT_TOP = this.props.board.length;
    this.TICK_TIME_INTERVAL = 300
  }
  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp);
    this.props.setMoldShape(moldShape());
    this.movePieceAuto();
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }
  movePieceAuto = () => {
    this.MOVE_TICK = setInterval(() => {
      const limit = this.LIMIT_TOP
      const position = this.props.position
      const isBoardBottom = position > limit;
      const isPossibleMoveBlock = isEnableToMoveBlock(this.props.board, 83);
      if (isBoardBottom || !isPossibleMoveBlock) {
        clearInterval(this.MOVE_TICK);
        this.restartBlock();
        return;
      }
      this.props.clearActiveBlock();
      this.props.moveTick();
    }, this.TICK_TIME_INTERVAL);
  };
  restartBlock = () => {
    this.props.setActiveToComplete();
    this.props.breakBlocks();
    this.props.setMoldShape(moldShape());
    this.props.setBlockInitPosition();
    this.movePieceAuto();
  };
  handleKeyUp = e => {
    switch (e.which) {
      case 87: // up
        this.props.operateTransformFlow()
        break;
      case 65: // left
        this.props.operateMoveFlow(e.which)
        break;
      case 83: // down
        this.props.operateMoveFlow(e.which)
        break;
      case 68: // right
        this.props.operateMoveFlow(e.which)
        break;
      default:
        return;
    }
  };
  render() {
    return (
      <div className="playGround_wrapper">
        <GameBoard board={this.props.board} />
      </div>
    );
  }
}

export default connect(
  state => ({
    moldShape: state.play.moldShape,
    board: state.play.board,
    position: state.play.position.y,
    xPosition: state.play.position.x,
    transformedMoldShape: getTransformedMoldShape(state.play.moldShape),
    enableToMoveBlock: state.play.enableToMoveBlock,
  }),
  {
    setMoldShape,
    moveTick,
    setActiveToComplete,
    setBlockInitPosition,
    clearActiveBlock,
    moveBlock,
    breakBlocks,
    checkEnableToMove,
    operateMoveFlow,
    operateTransformFlow,
  }
)(PlayGround);
