import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import InputIcon from "../inputIcon/inputIcon.component"
const TopNav = (props) => (
  <Row>
    <Col md={4}>
      <Button
        type="submit"
        style={{ backgroundColor: "#5E90F2", marginTop: "1%" }}
        onClick={props.handlerClick}
      >
        <FontAwesomeIcon
          icon={faPlusCircle}
          style={{ fontSize: "1.5em", color: "#fff", marginRight: "0.3em" }}
        />
        {props.text}
      </Button>
    </Col>
    <Col md={7} >
      <InputIcon
        type="text"
        placeholder="Search.."
        icon={faSearch}
        handler={props.handlerSearch}
      />
    </Col>
  </Row>
);

export default TopNav;
