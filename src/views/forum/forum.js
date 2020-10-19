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
import { getPosts, createPost, createComment, createAnswer } from '../../helpers'
import 'bootstrap/dist/css/bootstrap.css';
import ForumList from '../../components/forumList'




const Forum = () => {

    const id = useParams().id; //forum id
    const [modalShow, setModalShow] = React.useState(false);
    const [commentsShow, toggleCommentsShow] = useState(false);
    const [answersShow, toggleAnswersShow] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = React.useState(false);
    const handleSuccessModalClose = () => { setShowSuccessModal(false); window.location.reload(false) }

    const [newCommentContent, setCommentContent] = React.useState("")
    //const [newCommentCreator, setCommentCreator] = React.useState("")
    const newCommentCreator = "Marcelo Cifuentes"
    const [newCommentPostID, setCommentpostID] = React.useState("")

    const [newAnswerContent, setAnswerContent] = React.useState("")
    //const [newAnswerCreator, setAnswerCreator] = React.useState("")
    const newAnswerCreator = "Juan Camilo Gómez"
    const [newAnswerPostID, setAnswerPostID] = React.useState("")
    const [newAnswerCommentID, setAnswerCommentID] = React.useState("")

    function submitCommentHandler(event) {
        event.preventDefault();
        createComment(id, newCommentPostID, newCommentContent, newCommentCreator, "0").then((res) => {
            console.log(res)
            setModalShow(false)
            setShowSuccessModal(true)
        })
    }

    function changeCommentContentHandler(event) {
        event.preventDefault();
        setCommentContent(event.target.value)
        setCommentpostID(event.target.name)
    }

    function submitAnswerHandler(event) {
        event.preventDefault();
        createAnswer(id, newAnswerPostID, newAnswerCommentID, newAnswerContent, newAnswerCreator, "0").then((res) => {
            console.log(res)
            setModalShow(false)
            setShowSuccessModal(true)
        })
    }

    function changeAnswerContentHandler(event) {
        event.preventDefault();
        setAnswerContent(event.target.value)
        setAnswerPostID(event.target.name.substr(0, 24))
        setAnswerCommentID(event.target.name.substr(25, 50))
    }

    function SuccessModal() {
        return (
            <>
                <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Información suministrada exitosamente</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleSuccessModalClose}>
                            Ok
                </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }


    function NewPostModal(props) {

        const [newPostTitle, setPostTitle] = React.useState("")
        const [newPostContent, setNewPostContent] = React.useState("")
        const [newPostCreator, setNewPostCreator] = React.useState("")

        function submitPostHandler(event) {
            event.preventDefault();
            createPost(id,newPostTitle, newPostContent, newPostCreator, "0").then((res) => {
                console.log(res)
                setModalShow(false)
                setShowSuccessModal(true)
            })
        }

        function changePostTitleHandler(event) {
            event.preventDefault();
            setPostTitle(event.target.value)
        }

        function changePostContentHandler(event) {
            event.preventDefault();
            setNewPostContent(event.target.value)
        }

        function changePostCreatorHandler(event) {
            event.preventDefault();
            setNewPostCreator(event.target.value)
        }

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
                    <Form onSubmit={submitPostHandler} style={{ margin: "3%" }}>
                        <Form.Group controlId="postTitle">
                            <Form.Control as="textarea" rows="1" placeholder="Usuario creador" onChange={changePostCreatorHandler} />
                        </Form.Group>
                        <Form.Group controlId="postTitle">
                            <Form.Control as="textarea" rows="1" placeholder="Título" onChange={changePostTitleHandler} />
                        </Form.Group>
                        <Form.Group controlId="postTextarea1">
                            <Form.Control as="textarea" rows="3" placeholder="Contenido de la publicación" onChange={changePostContentHandler} />
                        </Form.Group>
                        <Button type="submit" style={{ backgroundColor: "#5E90F2", marginTop: "1%" }} >
                            Publicar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }


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
        getPosts(id).then((res) => {
            const forumData = res.data[0];
            setForum(forumData)
        }).catch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //console.log(forum)

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
                            {post.comments.length !== 0 && !commentsShow && <Link style={{ color: "#5E90F2" }} onClick={() => toggleCommentsShow(true)}>Mostrar comentarios: {post.comments.length}</Link>}
                            {commentsShow && <Link style={{ color: "#5E90F2" }} onClick={() => toggleCommentsShow(false)}>Esconder comentarios</Link>}

                            {commentsShow && forum.posts[index].comments.map((comment, index2) =>
                            
                                <ListGroup.Item style={{ marginBottom: "2%", marginTop: "1%" }} key={index2} >
                                    <p style={{ fontWeight: "lighter" }}>{comment.userCreator} | {String(comment.createdAt).substr(0, 10)}</p>
                                    <p>{comment.content}</p>
                                    {comment.answer.length !== 0 && !answersShow && <Link style={{ color: "#5E90F2" }} onClick={() => toggleAnswersShow(true)}>Mostrar respuestas: {comment.answer.length}</Link>}
                                    {answersShow && <Link style={{ color: "#5E90F2" }} onClick={() => toggleAnswersShow(false)}>Esconder respuestas</Link>}

                                    {answersShow && forum.posts[index].comments[index2].answer.map((answer, index3) =>

                                        <ListGroup.Item style={{ borderBlockWidth: "0", marginBottom: "2%", marginTop: "1%" }} key={index3} >
                                            <p style={{ marginBottom: "2%", fontWeight: "lighter" }}>{answer.userCreator} | {String(answer.createdAt).substr(0, 10)}</p>
                                            <p>{answer.content}</p>
                                        </ListGroup.Item>
                                    )}
                                    <Form onSubmit={submitAnswerHandler} style={{ marginTop: "1%" }}>
                                        <Form.Group controlId="answerTextarea1" onChange={changeAnswerContentHandler}>
                                            <Form.Control as="textarea" rows="3" name={post._id +"|"+ comment._id}  />
                                            <Button type="submit" style={{ backgroundColor: "#5E90F2", marginTop: "1%" }} >
                                                Responder
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                </ListGroup.Item>
                            )}
                            <Form onSubmit={submitCommentHandler} style={{ marginTop: "1%" }}>
                                <Form.Group controlId="commentTextarea1" onChange={changeCommentContentHandler}>
                                    <Form.Control name={post._id} as="textarea" rows="3" />
                                    <Button type="submit" style={{ backgroundColor: "#5E90F2", marginTop: "1%" }} >
                                        Comentar
                                  </Button>
                                </Form.Group>
                            </Form>
                        </ListGroup.Item>
                    </Card>

                )}
            </ListGroup>
            <SuccessModal
                show={showSuccessModal}
                onHide={() => setShowSuccessModal(false)}
            />
        </Container>
    )
}
export default Forum;
