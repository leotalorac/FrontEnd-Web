import {getStudyRooms} from '../shared/studyroomHelpers';
import Background from '../assets/images/logo_n.png';
import React, { Component } from "react";
import { withRouter } from "react-router";
import StudyRoom from "./StudyRoomComponent/StudyroomComponent";
import { STUDYROOMS } from "../shared/studyrooms";
import ForumList from "../components/forumList";
import Pagination from "react-bootstrap/Pagination";
import { Modal, Button, Form } from "react-bootstrap";
import Notes from "../components/notesList/notes.component";
import { getNotesByClass, createNote } from "../helpers";
import TopNav from "../components/topNav/topNav.component";
import SideBar from "../components/side-bar/SideBar";
import swal from 'sweetalert';
class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studyrooms: [],
      course_id: this.props.match.params.course_id,
      course_name: this.props.match.params.course_name,
      notes: [],
      notesPerPage: 2,
      currentPage: 1,
      showModalNote: false,
      noteContent:""
    };
  }

  handlerSidebar = (key) => {
    if(key == "1"){
      this.props.history.push("/");
    }
    if(key == "2"){
      this.props.history.push("/resources/"+this.state.course_id);
    }
    if(key == "3"){
      this.props.history.push("/");
    }
    if(key == "4"){
      this.props.logout();
      
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    getNotesByClass(this.state.course_id, this.props.userToken)
      .then((res) => {
        this.setState({ notes: res.data.data.getNotesByClass }, () =>
          console.log(this.state.notes)
        );
      })
      .catch();
      
      getStudyRooms(this.state.course_id, this.props.userToken)
        .then((res) => {
            this.setState({
                studyrooms: res.data.data.get_study_rooms
            })
        })
  }

  handlerClick = () => {
    const note = this.state.noteContent;
    if(note.length <= 20 && note.length > 0){
      createNote(note, this.state.course_id, this.props.userToken) 
      .then((res) => {
        console.log(res);
        swal("Creando Nota..!", "...", "success");
        const aux = {
          id_note: 31,
          content: note,
          id_user: 2,
          score: 0,
          id_course: 1,
        };
        this.setState({ notes: [...this.state.notes, aux] });
        this.setState({ showModalNote: false })
      })
      .catch();
    } else {

    }

  };

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
      {
        id: 4,
        text: "Cerrar Sesión",
        icon: "back",
      },
    ];
    return (
      <>
      <SideBar data={data} handler={this.handlerSidebar} />
      <div className="content">
        <TopNav
          handlerSearch={this.handlerSearch}
          text="New Note"
          handlerClick={() => this.setState({ showModalNote: true })}
        />
         <h1 className="title">
            {this.state.course_name} 
          </h1>
        <div className="row">
        {this.state.notes != null ? <Notes notes={this.state.notes} />: "" }  
        </div>
        <div className="row  mb-4">
          <div className="col mt-4">
            <ForumList course_id={this.state.course_id} />
          </div>
          <div className="col mt-4">
            <StudyRoom studyrooms={this.state.studyrooms} course_id={this.state.course_id}/>
          </div>
        </div>

        <Modal
          show={this.state.showModalNote}
          onHide={() => {
            this.setState({ showModalNote: false });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create New Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Insert text</Form.Label>
              <Form.Control as="textarea" rows="3" onChange={(e) => this.setState({noteContent:e.target.value})} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.setState({ showModalNote: false });
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={this.handlerClick}
            >
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      </>
    );
  }
}

export default withRouter(Course);
