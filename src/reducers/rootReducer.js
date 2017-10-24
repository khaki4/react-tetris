import { combineReducers } from 'redux';
import gameBoardReducer from "./gameBoard";

const rootReducer = combineReducers({
  play: gameBoardReducer
});

export default rootReducer;