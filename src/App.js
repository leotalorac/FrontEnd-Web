import React, {useEffect, useState} from "react";
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
import {useUser} from 'reactfire'

function App(props) {
  const firebase = useFirebaseApp();
  let user = useUser();
  async function logout() {
    await firebase.auth().signOut();
  }

  const [swReg, setswReg] = useState(0);

  useEffect(() => {
    navigator.serviceWorker.register("./serviceWorker.js").then((reg) => {
      console.log("registrado");
        setswReg(reg);
        reg.pushManager.getSubscription()
    });
  });

  return (
    <Router>
      <AuthCheck fallback={<Login swReg={swReg} />}>
        <Route
          exact
          path="/course/:course_name/:course_id"
          component={() => <Course logout={logout} userToken={user != null ? user.ya:""} />}
        ></Route>
        <Route exact path="/resources/:course_id" component={() => <Class logout={logout}  userToken={user != null ? user.ya:""} />}></Route>
        <Route exact path="/forum/posts/:id"  component={()=><Forum logout={logout} />}></Route>
        <Route exact path="/" component={() => <Courses swReg={swReg} logout={logout}  userToken={user != null ? user.ya:""} />}></Route>
      </AuthCheck>
    </Router>
  );
}

export default withRouter(App);
