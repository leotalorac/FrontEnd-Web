import React from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png'




const Login = () => {


    return (
        <Container style={{ maxWidth: "500px" }}>
            <div style={{ textAlign: "center" }}>
                <img src={Logo} alt="Logo WeStudy" style={{ width: "35%", height: "35%", marginBottom: "5%", marginTop: "10%", }} />
            </div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control type="email" placeholder="Ingresar correo electrónico" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" />
                    <Button style={{ marginTop: "2%", width: "100%" }} variant="primary" type="submit">
                        Ingresar
                 </Button>
                </Form.Group>
                <div style={{ textAlign: "center" }}>
                    <Link to={"register"}>
                        Registrarse
                    </Link>
                </div>
            </Form>
        </Container>
    )
}
export default Login;
