import { combineReducers } from 'redux';
import playReducer from "./playReducer";

const rootReducer = combineReducers({
  play: playReducer
});

export default rootReducer;