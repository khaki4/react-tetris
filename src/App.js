import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PlayGround from './components/PlayGround'

export default () => {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path="/" component={PlayGround} />
        </div>
      </Router>
    </div>
  );
};
