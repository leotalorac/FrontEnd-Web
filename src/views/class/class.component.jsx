import React from "react";
import "./class.styles.css";
import { withRouter } from "react-router-dom";
import SideBar from "../../components/side-bar/SideBar";
import Logo from "../../assets/images/logo_n.png";
import ResourceList from "../../components/resourceList/resourceList.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Button, Col, Row} from "react-bootstrap";
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import TopNav from "../../components/topNav/topNav.component"
import ModalResource from "../../components/modalResource/modalResource.component"

class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		resources:[],
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
    ];
    

    return (
      <div>
        <SideBar data={data} handler={this.handlerSelect} />

        <div className="content">

		 <TopNav handlerSearch={this.handlerSearch} text="Crear Recurso" handlerClick={this.handlerClick} />
		{/* <ModalResource show={this.state.showModal} handleShow={this.handleShowModal} handleClose={this.handleCloseModal} /> */}
          <h1 className="title">
            Software Architecture {">"}
            {">"} October 12{" "}
          </h1>
          <h5 className="subtitle">Resources</h5>
          <hr />
          <ResourceList data={this.state.resources} />
        </div>
      </div>
    );
  }
}

export default withRouter(Class);