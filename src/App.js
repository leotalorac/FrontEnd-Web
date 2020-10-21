import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, useHistory  } from 'react-router-dom';
import Forum from './views/forum/forum'
import Login from './views/login'
import Register from './views/register'
import Courses from './views/courses'
import Class from "./views/class/class.component"
import Course from './components/CourseComponent';
import {
  useFirebaseApp
}from 'reactfire'
import SideBar from "./components/side-bar/SideBar"
import { render } from '@testing-library/react';
import {withRouter, Switch} from 'react-router-dom'

function App() {
  const firebase = useFirebaseApp();
  return (  
    <Router>
      <Route exact path="/" render={() => {
        return <h1>Hi</h1>
      }}>
      </Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/course/:course_id" component={Course}></Route>
      <Route exact path="/class" component={Class}></Route>
      <Route exact path="/forum/posts/:id" component={Forum}></Route>
      <Route exact path="/courses" component={Courses}></Route>
    </Router>

  );
}

export default withRouter(App);
