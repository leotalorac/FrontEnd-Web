import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import { getAllCourses } from '../helpers'
import { Link } from "react-router-dom";
import SideBar from "../components/side-bar/SideBar";
import 'bootstrap/dist/css/bootstrap.css';



const Login = () => {

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
    }, [])

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


    console.log(courses)
    return (
        <div>
            
            <Container style={{ marginLeft: "25%"}}>
                <Row>
                    {courses.map((course, index) =>

                        <Card key={index} style={{ width: '18rem', margin: '1%' }}>
                            <Card.Body>
                                <Card.Title>{course.value.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Course subtitle</Card.Subtitle>
                                <Card.Text>
                                    Course description
                    </Card.Text>
                                <Link to={"/course/" + course.value.id_course}>Acceder al curso</Link>
                            </Card.Body>
                        </Card>

                    )}
                </Row>
            </Container>
        </div>
    )
}
export default Login;
