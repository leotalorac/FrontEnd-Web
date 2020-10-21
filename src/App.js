import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Forum from "./views/forum/forum";
import Login from "./views/login";
import Register from "./views/register";
import Courses from "./views/courses";
import Class from "./views/class/class.component";
import Course from "./components/CourseComponent";
import { useFirebaseApp, AuthCheck } from "reactfire";
import SideBar from "./components/side-bar/SideBar";
import { render } from "@testing-library/react";
import { withRouter, Switch } from "react-router-dom";

function App() {
  const firebase = useFirebaseApp();

  async function logout() {
    await firebase.auth().signOut();
  }

  return (
    <Router>
       <Route exact path="/register" component={Register}></Route>
      <AuthCheck fallback={<Login />}>
        <Route
          exact
          path="/course/:course_id"
          component={() => <Course logout={logout} />}
        ></Route>
        <Route exact path="/resources/:course_id" component={() => <Class logout={logout} />}></Route>
        <Route exact path="/forum/posts/:id" component={()=><Forum logout={logout} />}></Route>
        <Route exact path="/" component={() => <Courses logout={logout} />}></Route>
      </AuthCheck>
    </Router>
  );
}

export default withRouter(App);
