import React, {useState} from 'react';
import { Button, ListGroup, Col, Row} from "react-bootstrap";
import './StudyroomComponent.css';
import 'bootstrap/dist/css/bootstrap.css';
import StudyRoomDetails from './StudyroomDetails';
import CreateStudyRoom from './CreateStudyRoom';
import {IoIosPeople} from "react-icons/io";
function RenderStudyRoomItem({studyroom}){
    
    const [show, setShow] = useState(false);
    
    function handleClose() {setShow(false);}
    function handleOpen() {setShow(true);}
    return(
        <ListGroup.Item id="SingleStudyRoom" action variant="light" onClick={handleOpen}>
            <Row>
            <Col xs={12} md={9}>
                {studyroom.name}<br/>
                {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit'})
                .format(new Date(Date.parse(studyroom.date)))}
                <StudyRoomDetails
                    key={studyroom._id}
                    studyroom={studyroom}
                    show={show} 
                    handleClose={handleClose}       
                />
            </Col>
            <Col xs={4} md={3} id="ColItemSingleSR">
                <div id="IconItemSingleSR">
                    <IoIosPeople size={32}/>
                </div>
                
            </Col>
            </Row>
            
        </ListGroup.Item>
        
    );
}

const StudyRoom = (props) => { 
    const [show, setShow] = useState(false);
    
    function handleClose() {setShow(false);}
    function handleOpen() {setShow(true);}

    
    // function handleCreateStudyRoom(props,event){
    //     setShow(false);
    //     alert("Name" + props.name.value + "Description" + props.description.value +
    //     "Date" + props.date.value + "Duration: " + props.duration.value);
    //     event.preventDefault();
    // }
    const studyrooms = props.studyrooms.map((studyroom) => {
        return(
            <div key={studyroom._id} className="col">
                <RenderStudyRoomItem studyroom={studyroom} />
            </div>
        );
    })

    

    return(
        <div className="container" id="StudyroomsContainer" >
            <div className="col">
     
                    <ListGroup id="StudyroomsList">
                        <h3 id="StudyroomsTitle">Study Rooms</h3>
                        {studyrooms}
                    </ListGroup>

                    <Button id="CreateNewSRButton"  onClick={handleOpen}> + New StudyRoom</Button>  
                    <CreateStudyRoom
                        show={show} 
                        handleClose={handleClose}   
                        course_id={props.course_id}
                    />
                
            </div>
            
                 
        </div>
    );
    
}

export default StudyRoom;