import React from "react";
import "./class.styles.css";
import { withRouter } from "react-router-dom";
import SideBar from "../../components/side-bar/SideBar";
import Logo from "../../assets/images/logo_n.png";
import ResourceList from "../../components/resourceList/resourceList.component";
import Notes from "../../components/notes/notes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button, Form } from "react-bootstrap";
import { Col, Row} from "react-bootstrap";
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import TopNav from "../../components/topNav/topNav.component"
import {createResource, getResources} from "../../helpers"
import ModalResource from "../../components/modalResource/modalResource"
import swal from 'sweetalert';

class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    resources:[],
    notes:[],
    showModal:false,
    course_id: this.props.match.params.course_id,
    showModalNote:false,
    noteContent:""
	};
  }

  componentDidMount(){
    getResources(this.state.course_id, this.props.userToken)
    .then((res) => {
      this.setState({ resources: res.data.data.allResourcesOfClass }, () =>
        console.log(res.data.data.allResourcesOfClass)
      );
    })
    .catch();
  }

  

  handlerSelect = (key) => {
	  alert("clicked: " + key)
  };
  handlerSearch = (e) => {};

  handlerClick = (e) => {
	  alert("click")
  };

  handleShowModal = () => {
	  this.setState({showModal:true});
  }

  handleCloseModal = () => {
	this.setState({showModal:false});
}

handlerSidebar = (key) => {
  if(key == "1"){
    this.props.history.push("/");
  }
  if(key == "2"){
    this.props.history.goBack();
  }
  if(key == "3"){
    this.props.logout();
    this.props.history.push("/");
  }
}

handlerClick = (name) => {
  const note = this.state.noteContent;
  if(note.length <= 20 && note.length > 0){
    createResource(note, this.state.course_id,name,this.props.userToken) 
    .then((res) => {
      swal("Creando Recurso!" , "...","success");
      const aux = {
        idUser:name,
        content:note
      };
      this.setState({ resources: [...this.state.resources, aux] });
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
        text: "Go Back",
        icon: "back",
      },
      {
        id: 3,
        text: "Cerrar Sesión",
        icon: "back",
      },
    ];
    
    console.log(this.props.userToken);

    return (
      <div>
     <SideBar data={data} handler={this.handlerSidebar} />
        <div className="content">

		 <TopNav handlerSearch={this.handlerSearch} text="Create Resource" handlerClick={() => this.setState({showModalNote:true})} />
          <h1 className="title">
            Software Architecture {">"}
            {">"} October 12{" "}
          </h1>
          <h5 className="subtitle">Resources</h5> 
          <hr />
          <ResourceList data={this.state.resources} />
          
        </div>
      <ModalResource showModalNote={this.state.showModalNote} hideModal={() => {this.setState({showModalNote:false})}} update={(e) => this.setState({noteContent:e.target.value})} handlerClick={this.handlerClick} />

      </div>
    );
  }
}

export default withRouter(Class);
