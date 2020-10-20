import React, { Component } from "react";
import { withRouter } from "react-router";
import StudyRoom from "./StudyRoomComponent/StudyroomComponent";
import { STUDYROOMS } from "../shared/studyrooms";
import ForumList from "../components/forumList";
import Pagination from "react-bootstrap/Pagination";
import Notes from "../components/notesList/notes.component" 
import {getNotesByClass} from "../helpers"
import TopNav from "../components/topNav/topNav.component"
import SideBar from "../components/side-bar/SideBar"

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studyrooms: STUDYROOMS,
      course_id: this.props.match.params.course_id,
      notes:[],
      notesPerPage:2,
      currentPage:1,
    };
  }

  componentDidMount(){
    getNotesByClass(1).then((res) => {
      const notesData = res.data.data.getNotesByClass.map((item) => ({
        value: item,
      }));
      const notesList = [];
      for (let index = 0; index < notesData.length; index++) {
        notesList.push(notesData[index])
      }
      console.log(notesList)
      this.setState({notes:notesList})
    }).catch()
  }



  render() {
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
      <div>
    <SideBar data={data} handler={this.handlerSelect} />
      <div className="content">
        <TopNav handlerSearch={this.handlerSearch} text="Crear Nota" handlerClick={this.handlerClick} />
        <div className="row">
            <Notes notes={this.state.notes}  />
        </div>
        <div className="row mt-4 mb-4">
          <div className="col">
            <ForumList course_id={this.state.course_id} />
          </div>
          <div className="col">
            <StudyRoom studyrooms={this.state.studyrooms} />
          </div>
        </div>
      </div>
      </div>

    );
  }
}

export default Course;
