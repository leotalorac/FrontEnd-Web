import React, {useState} from 'react';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../images/logo.png'
import { render } from '@testing-library/react';
import 'firebase/auth'
import {useFirebaseApp} from 'reactfire'

/*


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:""
        };
      }



    render(){
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
  
}
export default Login;*/



export default (props) =>{
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const history = useHistory()
    const firebase = useFirebaseApp();

    const login = async()=>{
        await firebase.auth().signInWithEmailAndPassword(email,password);
        history.push(`courses`)

    }

    const logout = async () =>{
        await firebase.auth().signOut();
    }
    return (
        <div>
            <Container style={{ maxWidth: "500px" }}>
                <div style={{ textAlign: "center" }}>
                    <img src={Logo} alt="Logo WeStudy" style={{ width: "35%", height: "35%", marginBottom: "5%", marginTop: "10%", }} />
                </div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control type="email" placeholder="Ingresar correo electrónico" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
    
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                        <Button style={{ marginTop: "2%", width: "100%" }} variant="primary" onClick={login}>
                            Ingresar
                     </Button>
                     <button onClick={logout}> Cerrar sesión </button>
                    </Form.Group>
                    <div style={{ textAlign: "center" }}>
                        <Link to={"register"}>
                            Registrarse
                        </Link>
                    </div>
                </Form>
            </Container>
        </div>
    )
}
