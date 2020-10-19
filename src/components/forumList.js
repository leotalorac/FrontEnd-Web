import React, { useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from "react-router-dom";
import { getForums, createForum } from '../helpers'
import 'bootstrap/dist/css/bootstrap.css';



const ForumList = () => {

  const [modalShow, setModalShow] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const handleSuccessModalClose = () => {setShowSuccessModal(false); window.location.reload(false)}

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

  function NewForumModal(props) {

    const [newForumName, setNewForumName] = React.useState("")
    const [newForumCreator, setNewForumCreator] = React.useState("")

    function submitHandler(event) {
      event.preventDefault();
      createForum(newForumCreator, newForumName).then((res) => {
        setModalShow(false)
        setShowSuccessModal(true)
      })
    }

    function changeNameHandler(event) {
      event.preventDefault();
      setNewForumName(event.target.value)
    }

    function changeCreatorHandler(event) {
      event.preventDefault();
      setNewForumCreator(event.target.value)
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
            Nuevo foro
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={submitHandler} style={{ margin: "3%" }}>
            <Form.Group controlId="postTitle">
              <Form.Control as="textarea" rows="1" placeholder="Título del foro" onChange={changeNameHandler} />
            </Form.Group>
            <Form.Group controlId="postTitle">
              <Form.Control as="textarea" rows="1" placeholder="Usuario creador" onChange={changeCreatorHandler} />
            </Form.Group>
            <Button type="submit" style={{ backgroundColor: "#5E90F2", marginTop: "1%" }} >Crear foro</Button>
          </Form>

        </Modal.Body>
      </Modal>
    );
  }



  const [forums, setForums] = React.useState([{
    value: {
      name: String,
      _id: String
    }
  }])


  useEffect(() => {
    getForums().then((res) => {
      console.log(res.data.data)
      const forumsData = res.data.data.getForums.map((item) => ({
        value: item,
      }));
      const forumList = [];
      for (let index = 0; index < forumsData.length; index++) {
        forumList.push(forumsData[index])
        
      }
      setForums(forumList)
    }).catch()
  }, [])

  return (
    <Container>
          <Row>
            <Col>
              <h3 style={{ fontWeight: "bold", color: "#5E90F2" }}>Forums</h3>
            </Col>
            <Col>
              <Button style={{ marginLeft: "30%", backgroundColor: "#5E90F2" }} onClick={() => setModalShow(true)}>
                Crear un nuevo foro
            </Button>
              <NewForumModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
              <SuccessModal
                show={showSuccessModal}
                onHide={() => setShowSuccessModal(false)}
              />
            </Col>
          </Row>
          <Card style={{ marginTop: "5%" }} >
            <ListGroup style={{ maxHeight: "250px", overflow: "scroll" }}>
              {forums.map((forum, index) =>
                <Link key={index} to={"/forum/posts/" + forum.value._id}><ListGroup.Item action variant="light">{forum.value.name}</ListGroup.Item></Link>
              )}
            </ListGroup>
          </Card>
    </Container>
  )
}
export default ForumList;
