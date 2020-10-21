import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Forum from './views/forum/forum'
import Login from './views/login'
import Register from './views/register'
import Class from "./views/class/class.component"

import Course from './components/CourseComponent';
function App() {
  return (  
    <Router>
      <Route exact path="/" render={() => {
        return <h1>Hi</h1>
      }}>
      </Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/course" component={Course}></Route>
      <Route exact path="/class" component={Class}></Route>
      <Route exact path="/forum/posts/:id" component={Forum}></Route>
    </Router>

  );
}

export default App;
