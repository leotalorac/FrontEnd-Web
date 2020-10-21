import React from "react";
import "./class.styles.css";
import { withRouter } from "react-router-dom";
import SideBar from "../../components/side-bar/SideBar";
import Logo from "../../assets/images/logo_n.png";
import ResourceList from "../../components/resourceList/resourceList.component";
import Notes from "../../components/notes/notes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button, Col, Row} from "react-bootstrap";
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import TopNav from "../../components/topNav/topNav.component"
import ModalResource from "../../components/modalResource/modalResource.component"
import {getNotesByClass} from "../../helpers"

class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    resources:[],
    notes:[],
		showModal:false
	};
  }

  componentDidMount(){
	const data2 = [
		{
		  name: "Bryan Daniel Gomez",
		  text:
			"Este es el link de la clase de hoy: https://drive.google.com/drive/u/0/folders/1biPKmkQuVkx9RPTC1Fi2VCAN6h1enpnA",
		  icon: "daniel",
		},
		{
		  name: "Bryan Daniel Gomez",
		  text: "My Courses",
		  icon: "daniel",
		},
		{
		  name: "Bryan Daniel Gomez",
		  text: "My Courses",
		  icon: "juan",
		},
		{
		  name: "Bryan Daniel Gomez",
		  text: "My Courses",
		  icon: "juan",
		},
	  ];
    this.setState({resources:data2});
    

    getNotesByClass(1).then((res) => {
      const notesData = res.data.data.getNotesByClass.map((item) => ({
        value: item,
      }));
      const notesList = [];
      for (let index = 0; index < notesData.length; index++) {
        notesList.push(notesData[index])
      }
      this.setState({notes:notesList})
    }).catch()

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

  render() {
    
    

    return (
      <div>

        <div className="content">

		 <TopNav handlerSearch={this.handlerSearch} text="Crear Recurso" handlerClick={this.handlerClick} />
          <h1 className="title">
            Software Architecture {">"}
            {">"} October 12{" "}
          </h1>
          <h5 className="subtitle">Resources</h5>
          <hr />
          <ResourceList data={this.state.resources} />
          <h5 className="subtitle">Notes</h5>
          <hr />
          <Notes data={this.state.notes} />
        </div>
      </div>
    );
  }
}

export default withRouter(Class);
