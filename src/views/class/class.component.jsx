import React from "react";
import "./class.styles.css";
import { withRouter } from "react-router-dom";
import SideBar from "../../components/side-bar/SideBar";
import Logo from "../../assets/images/logo_n.png";
import ResourceList from "../../components/resourceList/resourceList.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlerSelect = (key) => {};

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

    return (
      <div>
        <SideBar data={data} handler={this.handlerSelect} />

        <div className="content">
          <Button
            type="submit"
            style={{ backgroundColor: "#5E90F2", marginTop: "1%" }}
          >
            <FontAwesomeIcon
              icon={faPlusCircle}
              style={{ fontSize: "1.5em", color: "#fff", marginRight: "0.3em" }}
            />
            Crear Recurso
          </Button>

          <h1 className="title">
            Software Architecture {">"}
            {">"} October 12{" "}
          </h1>
          <h5 className="subtitle">Resources</h5>
          <hr />
          <ResourceList data={data2} />
        </div>
      </div>
    );
  }
}

export default withRouter(Class);
