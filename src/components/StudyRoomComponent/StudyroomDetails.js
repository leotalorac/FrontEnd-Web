import React, {useState, useEffect} from 'react';
import { Button, Modal, Row, Col, Container} from "react-bootstrap";
import './StudyroomComponent.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BsFillPersonPlusFill,BsFillPersonDashFill } from 'react-icons/bs';
import {useUser} from 'reactfire'
import {inscribeUser,deleteUser} from '../../shared/studyroomHelpers';
import swal from 'sweetalert';


function StudyRoomDetails(props) {

    const [flagButtonInscribe, SetflagButtonInscribe] = useState(true);
    var user = useUser();

    useEffect(() => {
        props.studyroom.students.map((student) => {
            if((student.email == user.email) && (student.name == user.displayName)){
                SetflagButtonInscribe(false);
            }
        })
    })

    function handleInscribe(){
        inscribeUser(props.studyroom._id,user.displayName,"picture",user.email,user.ya).then((res) => {
            SetflagButtonInscribe(true);
            swal("Inscribiendo!", user.displayName , "success");
        })
        
    }

    function handleDelete(){
        props.studyroom.students.map((student) => {
            if((student.email == user.email) && (student.name == user.displayName)){
                deleteUser(props.studyroom._id,student._id, user.ya).then((res) => {
                    SetflagButtonInscribe(false);
                    swal({
                        title: "¿Estas seguro?",
                        text: "Una vez eliminada la inscripción no saldrá en tu calendar",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                          swal("La inscripción ha sido cancelada exitosamente", {
                            icon: "success",
                          });
                        } else {
                          swal("Intentalo mas tarde");
                        }
                      });
                })
            }
        })
    }

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
    <>
        <Modal 
            border="danger"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show} 
            onHide={props.handleClose}
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
                <Row>
                    
                    {flagButtonInscribe
                    ? <Button variant="primary" onClick={() => handleInscribe()}>
                            <BsFillPersonPlusFill id="iconAddSR"/>
                    </Button>
                    : <Button id="removeSRButton" variant="primary" onClick={() => handleDelete()}>
                            <BsFillPersonDashFill id="iconRemoveSR"/>
                    </Button>
                    }
                    
                    <div id="TitleAlert">
                        Una vez confirmes asistencia recibiras el link de la reunión a tu correo
                    </div>
                </Row>
                    
                </div>
            
                <Button  onClick={props.handleClose}>
                    X
                </Button>
            
            </Modal.Footer>
        </Modal>
    </>
    );
  }

  export default StudyRoomDetails;