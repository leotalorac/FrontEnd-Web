import React, { useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
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

    <h1>Aquí va formulario para crear foro</h1>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
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
    <Card style={{ margin: '10%' }} >
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Crear un nuevo foro
      </Button>
      <NewForumModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ListGroup>
        {forums.map((forum, index) =>
          <Link key={index} to={"/forum/posts/" + forum.value._id}><ListGroup.Item action variant="light">{forum.value.name}</ListGroup.Item></Link>
        )}
      </ListGroup>
    </Card>
  )
}
export default ForumList;
