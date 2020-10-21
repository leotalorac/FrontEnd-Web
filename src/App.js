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

class App extends React.Component {
  
  constructor(props) {
    super(props);
   this.state = {
     l:""
   }
}

  handlerClick = (key) => {
	  if(key == 2){
      this.props.history.push("/home/class");
      this.setState({l:"a"});
    }
  };
  render(){
    const data = [
      {
        id: 1,
        text: "My Courses",
        icon: "courses",
      },
      {
        id: 2,
        text: "Resources",
        icon: "courses",
      },
      
      {
        id: 3,
        text: "Go Back",
        icon: "back",
      },
    ];

    return (  
      <Router>
        <Route exact path="/login" component={Login}></Route>
        {/* <Route path="/home" component={() => <SideBar data={data} handler={this.handlerClick} /> }></Route> */}
        <Route exact path="/home/register" component={Register}></Route>
        <Route exact path="/home/course/:course_id" component={Course}></Route>
        <Route exact path="/home/class" component={Class}></Route>
        <Route exact path="/home/forum/posts/:id" component={Forum}></Route>
        <Route  path="/home/courses" component={Courses}></Route>
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Router>
  
    );
  }
  
}

export default withRouter(App);
