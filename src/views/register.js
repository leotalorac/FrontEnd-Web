import React, {useState} from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useHistory} from 'react-router-dom';
import Logo from '../images/logo.png';
import { RegisterUser } from '../helpers';



const Register = () => {
    const history = useHistory()
    const [email, setEmail] = React.useState("")
    const [displayName, setdisplayName] = React.useState("")
    const [password, setPassword] = React.useState("")

    function handleSubmit(event){

            RegisterUser(email,displayName, password).then((res) => {
                history.push("/")
        })
        event.preventDefault();
    }

    return (
        <Container style={{ maxWidth: "500px" }}>
            <div style={{ textAlign: "center" }}>
                <img src={Logo} alt="Logo WeStudy" style={{ width: "35%", height: "35%", marginBottom: "5%", marginTop: "10%", }} />
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="displayName" placeholder="Ingresar su nombre" onChange={(e) => setdisplayName(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control type="email" placeholder="Ingresar correo electrónico" onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}/>
                    <Button style={{ marginTop: "2%", width: "100%" }} variant="primary" type="submit" >
                        Registrarse
                 </Button>
                </Form.Group>
                <div style={{ textAlign: "center" }}>
                    <p>¿Ya tiene una cuenta? <Link to={"login"}>Ingresar</Link></p>
                </div>
            </Form>
        </Container>
    )
}
export default Register;
