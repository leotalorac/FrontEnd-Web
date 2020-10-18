import React, {useState} from 'react';
import { Button, ListGroup, Modal, FormGroup, Form, FormLabel, Row, Col, Container} from "react-bootstrap";
import './StudyroomComponent.css';
import 'bootstrap/dist/css/bootstrap.css';


function StudyRoomDetails(props) {

    const students = props.studyroom.students.map((student) => {
        return(
        <li className="subTitles">{student.name} - {student.email}</li>
        );
    })

    const resources = props.studyroom.resources.map((resource) => {
        return(
            <li>
                {resource.description}<br/>
                <a href={resource.resource}>{resource.resource}</a><br/>
                {resource.author}
            </li>
        );
    })
    return (
      <Modal 
        border="danger"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.studyroom.name} - 
            {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit'})
            .format(new Date(Date.parse( props.studyroom.date)))}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="show-grid">
            <Container>
                <Row>
                    <Col xs={9} md={6}>
                        <p>{props.studyroom.description}</p> 
                        <p>|| Duración: {props.studyroom.duration} minutos || </p> 
                    </Col>
                    <Col xs={9} md={6}>
                        <h5><b>Estudiantes Inscritos</b></h5>
                        {students}
                    </Col>
                </Row>
                <Row>
                    <Col xs={9} md={6}>
                    
                    </Col>
                    <Col xs={9} md={6}>
                        <h5><b>Recursos</b></h5>
                        {resources}
                    </Col>
                </Row>
                <Row>
                <div align="left">Invita: {props.studyroom.ownerName}
                <br/> <p className="subTitles">{props.studyroom.ownerEmail}</p></div>
                </Row>
            </Container>             
        </Modal.Body>
        
        <Modal.Footer id="StudyroomDetailsFooter">
            
            <div id="ContainerAlert">
            <p id="TitleAlert">
                Una vez confirmes asistencia recibiras el link de la reunión a tu correo
            </p>
            </div>
        
            <Button action onClick={props.onHide}>Close</Button>
           
        </Modal.Footer>
      </Modal>
    );
  }

  export default StudyRoomDetails;