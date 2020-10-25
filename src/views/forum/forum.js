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
import { getPosts, createPost, createComment, createAnswer,deletePost, deleteComment, deleteAnswer } from '../../helpers'
import 'bootstrap/dist/css/bootstrap.css';
import ForumList from '../../components/forumList'
import { useUser } from 'reactfire'
import SideBar from "../../components/side-bar/SideBar"
import { withRouter } from "react-router";
import { IoIosTrash } from "react-icons/io";
import swal from 'sweetalert';




const Forum = (props) => {

    const user = useUser();
    const id = useParams().id; //forum id
    const [modalShow, setModalShow] = React.useState(false);
    const [commentsShow, toggleCommentsShow] = useState(false);
    const [answersShow, toggleAnswersShow] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = React.useState(false);

    const [newCommentContent, setCommentContent] = React.useState("")
    //const [newCommentCreator, setCommentCreator] = React.useState("")
    const newCommentCreator = user.displayName
    const [newCommentPostID, setCommentpostID] = React.useState("")

    const [newAnswerContent, setAnswerContent] = React.useState("")
    //const [newAnswerCreator, setAnswerCreator] = React.useState("")
    const newAnswerCreator = user.displayName
    const [newAnswerPostID, setAnswerPostID] = React.useState("")
    const [newAnswerCommentID, setAnswerCommentID] = React.useState("")

    function submitCommentHandler(event) {
        event.preventDefault();
        createComment(id, newCommentPostID, newCommentContent, newCommentCreator, user.uid).then((res) => {
            console.log(res)
            setModalShow(false)
            setShowSuccessModal(!showSuccessModal)
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
            setShowSuccessModal(!showSuccessModal)
        })
    }

    function changeAnswerContentHandler(event) {
        event.preventDefault();
        setAnswerContent(event.target.value)
        setAnswerPostID(event.target.name.substr(0, 24))
        setAnswerCommentID(event.target.name.substr(25, 50))
    }

    function deletePostFunction(idPost) {
        deletePost(id, idPost).then((res) => {
            swal("Eliminando publicación..!", "...",  "success");
            setShowSuccessModal(!showSuccessModal)
        })
    }

    function deleteCommentFunction(idPost, idComment) {
        deleteComment(id, idPost, idComment).then((res) => {
            swal("Eliminando comentario..!", "...",  "success");
            setShowSuccessModal(!showSuccessModal)
        })
    }

    function deleteAnswerFunction(idPost, idComment, idAnswer) {
        deleteAnswer(id, idPost, idComment, idAnswer).then((res) => {
            swal("Eliminando respuesta..!", "...",  "success");
            setShowSuccessModal(!showSuccessModal)
        })
    }



    function NewPostModal(props) {

        const [newPostTitle, setPostTitle] = React.useState("")
        const [newPostContent, setNewPostContent] = React.useState("")
        const [newPostCreator, setNewPostCreator] = React.useState("")

        function submitPostHandler(event) {
            event.preventDefault();
            createPost(id, newPostTitle, newPostContent, user.displayName, "0").then((res) => {
                console.log(res)
                setModalShow(false)
                setShowSuccessModal(!showSuccessModal)
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
                    _id: String,
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
    }, [showSuccessModal])

    console.log(forum)

    const handlerSidebar = (key) => {
        if (key == "1") {
            props.history.push("/");
        }
        if (key == "2") {
            props.history.goBack();
        }
        if (key == "3") {
            props.logout();
            props.history.push("/");
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
            text: "Go Back",
            icon: "back",
        },
        {
            id: 3,
            text: "Cerrar Sesión",
            icon: "back",
        },
    ];
    return (
        <div>
            <SideBar data={data} handler={handlerSidebar} />
            <div className="content" style={{ margin: '5%' }}>
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
                                                {user.displayName === answer.userCreator && <Button onClick={()=>{deleteAnswerFunction(post._id, comment._id, answer._id)}} style={{ backgroundColor: "#FE4A49", marginTop: "1%" }} >
                                                    <IoIosTrash size={20} />
                                                </Button>}
                                            </ListGroup.Item>
                                        )}
                                        <Form onSubmit={submitAnswerHandler} style={{ marginTop: "1%" }}>
                                            <Form.Group controlId="answerTextarea1" onChange={changeAnswerContentHandler}>
                                                <Form.Control as="textarea" rows="3" name={post._id + "|" + comment._id} />
                                                <Button type="submit" style={{ backgroundColor: "#5E90F2", marginTop: "1%" }} >
                                                    Responder
                                                </Button>
                                                {user.displayName === comment.userCreator && <Button onClick={()=>{deleteCommentFunction(post._id, comment._id)}} style={{ backgroundColor: "#FE4A49", marginLeft: "1%", marginTop: "1%" }} >
                                                    <IoIosTrash size={20} />
                                                </Button>}
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
                                        {user.displayName === post.userCreator && <Button onClick={()=>{deletePostFunction(post._id)}} style={{ backgroundColor: "#FE4A49", marginLeft: "1%", marginTop: "1%" }} >
                                            <IoIosTrash size={20} />
                                        </Button>}
                                    </Form.Group>
                                </Form>
                            </ListGroup.Item>
                        </Card>

                    )}
                </ListGroup>
            </div>
        </ div>
    )
}
export default withRouter(Forum);
