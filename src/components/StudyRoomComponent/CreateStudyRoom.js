import React from 'react';
import 'date-fns';
import { Button, Modal, Col, Form, Row} from "react-bootstrap";
import './StudyroomComponent.css';
import 'bootstrap/dist/css/bootstrap.css';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
function CreateStudyRoom(props){

    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-10-20T21:11:54'));
    const [selectedName, setSelectedName] = React.useState();
    const [selectedDuration, setSelectedDuration] = React.useState(30);
    const [selectedDescription, setSelectedDescription] = React.useState();

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
    }
    const handleDurationChange = (event) => {
        setSelectedDuration(event.target.value)
    }
    const handleDescriptionChange = (event) => {
        setSelectedDescription(event.target.value)
    }

    function handleSubmit(event){
        alert("date: " + selectedDate +
              "\nname: " + selectedName + 
              "\nduration: " + selectedDuration + 
              "\ndescription: " + selectedDescription);
        event.preventDefault();
    }
    return (
       <>
          <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Crea una sala de Estudio</Modal.Title>
            </Modal.Header>
            
                <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridTittle">
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" placeholder="Título" onChange={handleNameChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridDuration">
                            <Form.Label>
                                Duración
                                <t className="subTitles"> (En minutos)</t>
                            </Form.Label>
                        <Form.Control as="select"  defaultValue="30" onChange={handleDurationChange}>
                            <option>30</option>
                            <option>45</option>
                            <option>60</option>
                            <option>75</option>
                            <option>90</option>
                            <option>120</option>
                        </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDate">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Fecha"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                            </MuiPickersUtilsProvider>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridDate">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label="Hora de Inicio"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                    />
                            </MuiPickersUtilsProvider>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridDescription">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={handleDescriptionChange}/>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer id="StudyroomDetailsFooter">
                    <Button type="submit" variant="primary">
                        + Crear
                    </Button>
                </Modal.Footer>
                </Form>
            
          </Modal>
        </>
      );
}
export default CreateStudyRoom;
