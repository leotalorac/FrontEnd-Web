import React, { useEffect, useState } from 'react';

import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';


function NewPostModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ color: "#5E90F2", marginBottom: "2%" }} id="contained-modal-title-vcenter">
                Nueva publicación
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form style={{ margin: "3%" }}>
                    <Form.Group controlId="postTitle">
                        <Form.Control as="textarea" rows="1" placeholder="Título" />
                    </Form.Group>
                    <Form.Group controlId="postTextarea1">
                        <Form.Control as="textarea" rows="3" placeholder="Contenido de la publicación" />
                        <Button style={{ backgroundColor: "#5E90F2", marginTop: "1%" }} >
                            Publicar
                        </Button>
                    </Form.Group>
                </Form>

            </Modal.Body>
        </Modal>
    );
}

const Forum = () => {

    const id = useParams().id; //forum id
    const [modalShow, setModalShow] = React.useState(false);
    const [commentsShow, toggleCommentsShow] = useState(false);
    const [answersShow, toggleAnswersShow] = useState(false);

    const [forum, setForum] = useState({
        _id: String,
        createdAt: Date,
        name: String,
        posts: [{
            _id: String,
            title: String,
            content: String,
            userCreator: String,
            comments: [{
                _id: String,
                content: String,
                userCreator: String,
                createdAt: Date,
                answer: [{
                    content: String,
                    userCreator: String,
                    createdAt: Date,
                }]
            }]

        }],
        userCreator: String
    })


    useEffect(() => {
        axios.get("http://52.200.134.90:3000/forums/" + id).then((res) => {
            const forumData = res.data[0];
            setForum(forumData)
        })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(forum)

    return (
        <Container style={{ margin: '5%' }}>
            <Row>
                <Col>
                    <h1 style={{ fontWeight: "bold", color: "#5E90F2" }}>{forum.name}</h1>
                </Col>
                <Col>
                    <Button style={{ backgroundColor: "#5E90F2", marginLeft: "70%" }} onClick={() => setModalShow(true)}>
                        Añadir publicación
                </Button>
                    <NewPostModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </Col>
            </Row>
            <p>Usuario administrador: {forum.userCreator}</p>
            <ListGroup>
                {forum.posts.map((post, index) =>
                    <Card style={{ marginBottom: '2%', backgroundColor: "#5E90F2" }}>
                        <Card.Header style={{ color: "white", fontWeight: "bold" }}>{post.title} | {post.userCreator}</Card.Header>
                        <ListGroup.Item key={index} >
                            <p style={{ marginBottom: "5%" }}>{post.content}</p>
                            {post.comments.length !== 0 && !commentsShow && <Link style={{ color:"#5E90F2" }} onClick={() => toggleCommentsShow(true)}>Mostrar comentarios: {post.comments.length}</Link>}
                            {commentsShow && <Link style={{ color:"#5E90F2" }} onClick={() => toggleCommentsShow(false)}>Esconder comentarios</Link>}
                            { commentsShow && forum.posts[index].comments.map((comment, index2) =>
                                <ListGroup.Item style={{ marginBottom: "2%", marginTop:"1%" }} key={index2} >
                                    <p style={{ fontWeight: "lighter" }}>{comment.userCreator} | {String(comment.createdAt).substr(0, 10)}</p>
                                    <p>{comment.content}</p>
                                    {comment.answer.length !== 0 && !answersShow && <Link style={{ color:"#5E90F2" }} onClick={() => toggleAnswersShow(true)}>Mostrar respuestas: {comment.answer.length}</Link>}
                                    {answersShow && <Link style={{  color:"#5E90F2" }} onClick={() => toggleAnswersShow(false)}>Esconder respuestas</Link>}
                                    {answersShow && forum.posts[index].comments[index2].answer.map((answer, index3) =>
                                        <ListGroup.Item style={{ borderBlockWidth: "0", marginBottom: "2%", marginTop:"1%" }} key={index3} >
                                            <p style={{ marginBottom: "2%", fontWeight: "lighter" }}>{answer.userCreator} | {String(answer.createdAt).substr(0, 10)}</p>
                                            <p>{answer.content}</p>
                                        </ListGroup.Item>
                                    )}
                                    <Form style={{ marginTop: "1%" }}>
                                        <Form.Group controlId="answerTextarea1">
                                            <Form.Control as="textarea" rows="3" />
                                            <Button style={{ backgroundColor: "#5E90F2", marginTop: "1%" }} >
                                                Responder
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                </ListGroup.Item>
                            )}
                            <Form style={{ marginTop: "1%" }}>
                                <Form.Group controlId="commentTextarea1">
                                    <Form.Control as="textarea" rows="3" />
                                    <Button style={{ backgroundColor: "#5E90F2", marginTop: "1%" }} >
                                        Comentar
                                  </Button>
                                </Form.Group>
                            </Form>
                        </ListGroup.Item>
                    </Card>
                )}
            </ListGroup>
        </Container>
    )
}
export default Forum;
