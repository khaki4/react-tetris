import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import GameBoard from './GameBoard';
import BoardMask from './BoardMask'
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
import { keyDirection, TICK_TIME_INTERVAL, MASK_HEIGHT } from '../lib/Constants'

class PlayGround extends PureComponent {
  constructor(props) {
    super(props);
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
    this.moveTick = setInterval(() => {
      if (!isEnableToMoveBlock(this.props.board, keyDirection.DOWN)) {
        clearInterval(this.moveTick);
        if (this.props.position < MASK_HEIGHT) {
          alert('Game Over')
          return
        }
        this.restartBlock();
        return;
      }
      this.props.clearActiveBlock()
      this.props.operateMoveFlow(keyDirection.DOWN)
    }, TICK_TIME_INTERVAL);
  }
  restartBlock = () => {
    this.props.setActiveToComplete();
    this.props.breakBlocks();
    this.props.setBlockInitPosition();
    this.props.setMoldShape(moldShape());
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
        {/*<BoardMask />*/}
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
    gameover: state.play.gameover,
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
