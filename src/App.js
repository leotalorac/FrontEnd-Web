import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Course from './components/CourseComponent';
function App() {
  return (
    <Router>
      <Route exact path="/" render={() => {
        return <h1>Hi</h1>
      }}>
      </Route>
      <div>
        <Course/>
      </div>
    </Router>

  );
}

export default App;
