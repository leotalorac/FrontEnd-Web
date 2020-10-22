import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { getAllCourses, createCourse } from '../helpers'
import { Link } from "react-router-dom";
import SideBar from "../components/side-bar/SideBar";
import 'bootstrap/dist/css/bootstrap.css';
import { withRouter } from "react-router";
import swal from 'sweetalert';



const Courses = (props) => {

    const [show, setShow] = React.useState(false);



    function NewCourseModal(props) {

        const [newCourseName, setNewCourseName] = React.useState("")

        function submitHandler(event) {
            event.preventDefault();
            createCourse(1, newCourseName, "0").then((res) => {
                swal("Creando Curso..!", "...", "success");
                setModalShow(false)
                setShow(true)
            })
        }

        function changeNameHandler(event) {
            event.preventDefault();
            setNewCourseName(event.target.value)
        }


        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Nuevo curso
              </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={submitHandler} style={{ margin: "3%" }}>
                        <Form.Group controlId="postTitle">
                            <Form.Control as="textarea" rows="1" placeholder="Título del foro" onChange={changeNameHandler} />
                        </Form.Group>
                        <Button type="submit" style={{ backgroundColor: "#5E90F2", marginTop: "1%" }} >Crear curso</Button>
                    </Form>

                </Modal.Body>
            </Modal>
        );
    }


    const [modalShow, setModalShow] = React.useState(false);
    const [courses, setCourses] = React.useState([{
        value:
        {
            id_course: String,
            name: String
        }
    }])

    useEffect(() => {
        getAllCourses().then((res) => {
            console.log(res.data.data.getAllCourses)
            const coursesData = res.data.data.getAllCourses.map((item) => ({
                value: item,
            }));
            const coursesList = [];
            for (let index = 0; index < coursesData.length; index++) {
                coursesList.push(coursesData[index])
            }
            setCourses(coursesList)
        }).catch()
    }, [show])

    const handlerSidebar = (key) => {
        if (key == "1") {
        }
        if (key == "2") {
            props.logout();
        }

    }

    const data = [
        {
            id: 1,
            text: "My Courses",
            icon: "courses",
        },
        {
            id: 2,
            text: "Cerrar Sesión",
            icon: "back",
        },
    ];



    console.log(courses)
    return (
        <div>

            <div className="content" >
                <SideBar data={data} handler={handlerSidebar} />
                <Row>
                    <Col>
                        <h1 style={{ marginLeft: "1%", fontWeight: "bold", color: "#5E90F2" }}>Cursos</h1>
                    </Col>
                    <Col>
                        <Button style={{ backgroundColor: "#5E90F2", marginLeft: "50%" }} onClick={() => setModalShow(true)} >
                            Nuevo curso
                </Button>
                        <NewCourseModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Col>
                </Row>
                <Row>
                    {courses.map((course, index) =>
                        <Link style={{ margin: '1%' }} to={"/course/" + course.value.name + "/" + course.value.id_course}>
                            <Card key={index} style={{ width: '18rem', margin: '1%', backgroundColor: "white" }}>
                                <Card.Body>
                                    <Card.Title style={{ color: "#5E90F2", fontWeight: "bold" }}>{course.value.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>


                    )}
                </Row>
            </div>
        </div>
    )
}
export default withRouter(Courses);
