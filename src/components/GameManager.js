import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import GameBoard from './GameBoard';
import BoardMask from './BoardMask'
import NextBlockSection from './NextBlockSection'
import {
  getTransformedMoldShape,
  setMoldShape,
  setNextMoldShape,
  moveTick,
  setActiveToComplete,
  setBlockInitPosition,
  clearActiveBlock,
  isEnableToMoveBlock,
  breakBlocks,
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
      // this.props.operateMoveFlow(keyDirection.DOWN)
    }, parseInt(TICK_TIME_INTERVAL - TICK_TIME_INTERVAL * this.props.scoreBoard.level * 0.1));
  }
  restartBlock = () => {
    this.props.setActiveToComplete();
    this.props.breakBlocks();
    this.props.setBlockInitPosition();
    this.props.setNextMoldShape(moldShape())
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
        <BoardMask scoreBoard={this.props.scoreBoard} />
        <GameBoard board={this.props.board} />
        <NextBlockSection nextBlock={this.props.nextMoldShape} />
      </div>
    );
  }
}

export default connect(
  state => ({
    moldShape: state.play.moldShape,
    nextMoldShape: state.play.nextMoldShape,
    board: state.play.board,
    position: state.play.position.y,
    xPosition: state.play.position.x,
    transformedMoldShape: getTransformedMoldShape(state.play.moldShape),
    enableToMoveBlock: state.play.enableToMoveBlock,
    gameover: state.play.gameover,
    scoreBoard: state.play.scoreBoard,
  }),
  {
    setMoldShape,
    setNextMoldShape,
    moveTick,
    setActiveToComplete,
    setBlockInitPosition,
    clearActiveBlock,
    breakBlocks,
    operateMoveFlow,
    operateTransformFlow,
  }
)(PlayGround);
