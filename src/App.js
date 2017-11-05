import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameEntryPage from './components/GameEntryPage'
import GameManager from './components/GameManager'
import "./App.css";

export default () => {
  return (
    <div className="App container">
      <Router>
        <div>
          <Route exact path="/" component={GameEntryPage} />
          <Route path="/playground" component={GameManager} />
        </div>
      </Router>
    </div>
  );
};
