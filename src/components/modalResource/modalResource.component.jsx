import React, { useState } from 'react';
import { Modal, Col, Button } from "react-bootstrap";
const ModalResource =(props) => {
    
    
    return (
      <>
        <Button variant="primary" onClick={props.handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={props.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default ModalResource;
 