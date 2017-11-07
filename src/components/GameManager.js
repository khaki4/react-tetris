import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import GameBoard from './GameBoard';
import NextBlockSection from './NextBlockSection'
import PersonalInfo from './PersonalInfo'
import {
  startGame,
  endGame,
  getTransformedMoldShape,
  setMoldShape,
  setNextMoldShape,
  moveTickTwice,
  moveDownQuickly,
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

const GamePanel = ({ isGameStart, scoreBoard, board, nextMoldShape, gameResume, gamePause, gameEnd }) => {
  if (!isGameStart) return null
  return (
    <div>
      <GameBoard board={board} scoreBoard={scoreBoard} />
      <div className="gameinfo">
        <NextBlockSection nextBlock={nextMoldShape} />
        <div className="button-groups">
          <div className="ui icon buttons">
            <button className="ui button" onClick={gameResume}>
              <i className="play icon"></i>
            </button>
            <button className="ui button" onClick={gamePause}>
              <i className="pause icon"></i>
            </button>
            <button className="ui button" onClick={gameEnd}>
              <i className="stop icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

class PlayGround extends PureComponent {
  constructor(props) {
    super(props);
    this.moveTick = null
  }
  componentDidMount() {
    this.gameStart()
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }
  movePieceAuto = () => {
    if (this.moveTick) {
      clearInterval(this.moveTick);
    }
    this.moveTick = setInterval(() => {
      const positionY = this.props.position
      if (!isEnableToMoveBlock(this.props.board, keyDirection.DOWN)) {
        clearInterval(this.moveTick);
        const positionY = this.props.position
        if (positionY < MASK_HEIGHT) {
          alert('Game Over')
          return
        }
        console.log('Re positionY', positionY)
        this.restartBlock();
        return;
      }
      
      console.log('positionY', positionY)
      this.props.clearActiveBlock()
      this.props.operateMoveFlow(keyDirection.DOWN)
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
      case 32: // quick down
        this.props.moveDownQuickly(keyDirection.DOWN)
        break;
      default:
        return;
    }
  };
  gameStart = () => {
    document.addEventListener('keyup', this.handleKeyUp);
    this.props.startGame()
    this.gameResume()
  }
  gameEnd = () => {
    this.gamePause()
    this.props.endGame()
  }
  gameResume = () => {
    this.movePieceAuto();
  }
  gamePause = () => {
    if (!this.moveTick) return
    clearInterval(this.moveTick);
  }
  render() {
    return (
      <div>
        <div className="playGround_wrapper cf">
          <GamePanel
            isGameStart={this.props.isGameStart}
            scoreBoard={this.props.scoreBoard}
            board={this.props.board}
            nextMoldShape={this.props.nextMoldShape}
            gameResume={this.gameResume}
            gamePause={this.gamePause}
            gameEnd={this.gameEnd}
          />
          {!this.props.isGameStart && <button className="ui orange button btn-restart" onClick={this.gameStart}>Restart</button>}
        </div>
        
        <div className="ui divider"></div>
        <PersonalInfo />
      </div>
    );
  }
}

export default connect(
  state => ({
    isGameStart: state.play.isGameStart,
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
    startGame,
    endGame,
    setMoldShape,
    setNextMoldShape,
    moveTickTwice,
    moveDownQuickly,
    setActiveToComplete,
    setBlockInitPosition,
    clearActiveBlock,
    breakBlocks,
    operateMoveFlow,
    operateTransformFlow,
  }
)(PlayGround);
