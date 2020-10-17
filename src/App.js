import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import forumList from './components/forumList'
import Class from "./views/class/class.component"
import Forum from './views/forum'

function App() {
  return (  
    <Router>
      <Route exact path="/" render={() => {
        return <h1>Hi</h1>
      }}>
      </Route>
      <Route exact path="/forum" component={forumList}></Route>
      <Route exact path="/class" component={Class}></Route>
      <Route exact path="/forum/posts/:id" component={Forum}></Route>
    </Router>

  );
}

export default App;
