import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import styled from 'styled-components';
import {Col, Image, Row, Modal, Button, Form} from "react-bootstrap";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {useUser} from 'reactfire'
import { isFuture } from "date-fns";

const ModalResource = ({showModalNote,hideModal,handlerClick,update}) => {

    var user = useUser();
        return(
       
            <Modal
            show={showModalNote}
            onHide={hideModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Create New Resource</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Insert text</Form.Label>
                <Form.Control as="textarea" rows="3" onChange={update} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={hideModal}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handlerClick(user.displayName)}
              >
                Create
              </Button>
            </Modal.Footer>
          </Modal>
            );
 }

 export default ModalResource;