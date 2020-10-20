import React, { Component } from "react";
import { withRouter } from "react-router";
import StudyRoom from "./StudyRoomComponent/StudyroomComponent";
import { STUDYROOMS } from "../shared/studyrooms";
import ForumList from "../components/forumList";
import Pagination from "react-bootstrap/Pagination";
import Notes from "../components/notesList/notes.component" 

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
      this.setState({notes:[
          {
            id:1,
            name:"Octubre 12"
          },
          {
            id:2,
            name:"Octubre 13"
          },
          {
            id:3,
            name:"Octubre 14"
          },
          {
            id:4,
            name:"Octubre 15"
          },
          {
            id:5,
            name:"Octubre 16"
          },
          {
            id:6,
            name:"Octubre 17"
          },
          {
            id:7,
            name:"Octubre 18"
          },
          {
            id:8,
            name:"Octubre 19"
          },
      ]})
  }



  render() {
    let items = [];
    for (let number = 1; number <= Math.ceil(this.state.notes.length / this.state.notesPerPage); number++) {
      items.push(
        <Pagination.Item key={number} onClick={() => this.handlePagination(number)} active={number === this.state.currentPage}>
          {number}
        </Pagination.Item>
      );
    }

    const notes = this.state.notes.map(row => {
        return(
            <p>{row.name}</p>
        );
    });

    const indexOfLastPost = this.state.currentPage * this.state.notesPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.notesPerPage;
    const currentNotes = notes.slice(indexOfFirstPost, indexOfLastPost);

    return (
      <div className="col">
        <div className="row">
          <div>
            <Notes notes={this.state.notes}  />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ForumList course_id={this.state.course_id} />
          </div>
          <div className="col">
            <StudyRoom studyrooms={this.state.studyrooms} />
          </div>
        </div>
      </div>
    );
  }
}

export default Course;
