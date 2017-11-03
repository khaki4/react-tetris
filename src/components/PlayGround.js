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
  breakBlocks
} from '../reducers/gameBoard';
import { moldShape } from '../lib/BlockMold';

class PlayGround extends PureComponent {
  constructor(props) {
    super(props);
    this.LIMIT_TOP = 18;
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
      const isBoardBottom = this.props.position > this.LIMIT_TOP;
      const isPossibleMoveBlock = isEnableToMoveBlock(this.props.board, 'down');
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
    let checkResult = '';
    switch (e.which) {
      case 87: // up
        const transformedMoldShape = getTransformedMoldShape(this.props.moldShape)
        const moldSize = getBlockSize(transformedMoldShape)
        checkResult = isEnableToMoveBlock(this.props.board, 'up', moldSize, this.props.xPosition);
        if (!checkResult) return;
        this.props.setMoldShape(transformedMoldShape);
        break;
      case 65: // left
        checkResult = isEnableToMoveBlock(this.props.board, 'left');
        if (!checkResult) break;
        this.props.moveBlock(e.which);
        break;
      case 83: // down
        checkResult = isEnableToMoveBlock(this.props.board, 'down');
        if (!checkResult) break;
        this.props.moveBlock(e.which);
        break;
      case 68: // right
        checkResult = isEnableToMoveBlock(this.props.board, 'right');
        if (!checkResult) break;
        this.props.moveBlock(e.which);
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
  }),
  {
    setMoldShape,
    moveTick,
    setActiveToComplete,
    setBlockInitPosition,
    clearActiveBlock,
    moveBlock,
    breakBlocks
  }
)(PlayGround);
