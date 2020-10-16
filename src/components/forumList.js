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
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';



function NewForumModal(props) {
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

        <Form style={{ margin: "3%" }}>
          <Form.Group controlId="postTitle">
            <Form.Control as="textarea" rows="1" placeholder="Título del foro" />
            <Button style={{ backgroundColor: "#5E90F2", marginTop: "1%" }} >Crear foro</Button>
          </Form.Group>
        </Form>

      </Modal.Body>
    </Modal>
  );
}



const ForumList = () => {

  const [modalShow, setModalShow] = React.useState(false);

  const [forums, setForums] = React.useState([{
    value: {
      name: String,
      _id: String
    }
  }])


  useEffect(() => {
    axios.get("http://52.200.134.90:3000/forums").then((res) => {
      const forumsData = res.data.map((item) => ({
        value: item,
      }));
      const forumList = [];
      for (let index = 0; index < forumsData.length; index++) {
        forumList.push(forumsData[index])
        console.log(forumsData[index])
      }
      setForums(forumList)
    })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  return (
    <Container>
      <Row >
        <Col>
          <Card style={{ margin: '12%' }} >

          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
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
            </Col>
          </Row>
          <Card style={{ marginTop: "5%" }} >
            <ListGroup style={{ maxHeight: "250px", overflow: "scroll" }}>
              {forums.map((forum, index) =>
                <Link key={index} to={"/forum/posts/" + forum.value._id}><ListGroup.Item action variant="light">{forum.value.name}</ListGroup.Item></Link>
              )}
            </ListGroup>
          </Card>
        </Col>
        <Col>
          <Card style={{ margin: '30%' }} >
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
export default ForumList;
