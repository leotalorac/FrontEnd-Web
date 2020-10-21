import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, useHistory  } from 'react-router-dom';
import Forum from './views/forum/forum'
import Login from './views/login'
import Register from './views/register'
import Courses from './views/courses'
import Class from "./views/class/class.component"
import Course from './components/CourseComponent';
import SideBar from "./components/side-bar/SideBar"
import { render } from '@testing-library/react';
import {withRouter, Switch} from 'react-router-dom'

function App () {
  
    return (  
      <Router>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/course/:course_id" component={Course}></Route>
        <Route exact path="/class" component={Class}></Route>
        <Route exact path="/me/forum/posts/:id" component={Forum}></Route>
        <Route  path="/courses" component={Courses}></Route>
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Router>
  
    );
  
}

export default withRouter(App);
