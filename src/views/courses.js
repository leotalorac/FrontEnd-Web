import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { getAllCourses, createCourse, PushNotification, SubscribeUser, getTeachers } from '../helpers'
import { Link } from "react-router-dom";
import SideBar from "../components/side-bar/SideBar";
import 'bootstrap/dist/css/bootstrap.css';
import { withRouter } from "react-router";
import swal from 'sweetalert';
import { useUser } from 'reactfire'
import ListGroup from 'react-bootstrap/ListGroup'



const Courses = (props) => {

    const [show, setShow] = React.useState(false);
    var user = useUser();

    function getPublicKey() {
        // return fetch("http://ec2-54-92-227-88.compute-1.amazonaws.com:3005/api/key").then(res => res.arrayBuffer())
        //     .then(key => new Uint8Array(key))
        return new Uint8Array([4, 228, 238, 51, 173, 81, 218, 100, 221, 83, 177, 211, 48, 44, 205, 72, 48, 128, 62, 78, 248, 163, 242, 34, 68, 14, 40, 201, 63, 212, 223, 225, 178, 83, 43, 33, 112, 84, 173, 215, 164, 134, 168, 104, 19, 228, 145, 183, 221, 220, 140, 10, 40, 33, 19, 218, 13, 152, 206, 214, 73, 152, 201, 72, 60])
    }

    const sus = async () => {
        let key = getPublicKey();
        console.log(key);
        if (props.swReg.pushManager != null) {
            props.swReg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: key
            }).then(res => res.toJSON()).then(sus => {
                console.log(JSON.stringify(sus));
                SubscribeUser(sus, user.ya).then((res) => {
                    console.log("listo!")
                })
            })
        }
    }

    function NewCourseModal(props) {

        const [newCourseName, setNewCourseName] = React.useState("")

        function submitHandler(event) {
            event.preventDefault();
            createCourse(1, newCourseName, "0", user.ya).then((res) => {
                swal("Creando Curso..!", "...", "success");
                setModalShow(false)
                setShow(!show)
                PushNotification(newCourseName, 'Nuevo Curso creado', user.displayName, user.ya).then((res) => {
                    swal("Notificando a tus compañeros", "...", "success");
                })
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
    const [teachers, setTeachers] = React.useState([{
        value: {
            name: String,
            mail: String
        }
    }])

    useEffect(() => {
        /*if(Notification.permission != "granted"){
           Notification.requestPermission((e) => {
               if(e == "granted"){
                   sus();
               }
           });
       }*/
        getTeachers(user.ya).then((res) => {
            //console.log(res.data.data.getTeachers)
            const teachersData = res.data.data.getTeachers.map((item) => ({
                //const forumsData = res.data.map((item) => ({
                value: item,
            }));
            const teachersList = [];
            for (let index = 0; index < teachersData.length; index++) {
                teachersList.push(teachersData[index])

            }
            setTeachers(teachersList)
            /*const coursesData = res.data.data.getAllCourses.map((item) => ({
                value: item,
            }));
            const coursesList = [];
            for (let index = 0; index < coursesData.length; index++) {
                coursesList.push(coursesData[index])
            }
            setCourses(coursesList)*/
        }).catch()
        getAllCourses(user.ya).then((res) => {
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




    console.log(teachers)
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
                <h1 style={{ marginLeft: "1%", fontWeight: "bold", color: "#5E90F2" }}>Profesores</h1>
                <p>Los puedes encontrar en "el nombre del ms" </p>
                <Card style={{ marginTop: "5%", marginRight:"40%" }} >
                        <ListGroup style={{ maxHeight: "250px" }}>
                            {teachers.map((teacher) =>
                                <ListGroup.Item action variant="light">{teacher.value.name + "     |     " + teacher.value.mail}</ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
            </div>
        </div>
    )
}
export default withRouter(Courses);
