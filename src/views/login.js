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
import { RegisterUser, LDAPAuthUser, LDAPCreateUser } from '../helpers';


export default (props) =>{
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [showLogin, setShowLogin] = React.useState(true)

    const history = useHistory()
    const firebase = useFirebaseApp();

    const login = async()=>{
        LDAPAuthUser(email, password).then((res) => {
            console.log(res)
            if(res.data.data.LDAPAuthUser.status == true){
                 firebase.auth().signInWithEmailAndPassword(email,password).then(function(result) {
                    history.push("/")
                  }).catch(function(error) {
                    alert("no login")
                  });
            }else{
                alert("First auth not working")
            }
        })
    }

    const [emailReg, setEmailReg] = React.useState("")
    const [displayNameReg, setdisplayNameReg] = React.useState("")
    const [passwordReg, setPasswordReg] = React.useState("")

    function handleSubmit(event){

        LDAPCreateUser(emailReg, displayNameReg,displayNameReg, passwordReg ).then((res) => {
            if(res.data.data.LDAPCreateUser.status){
                RegisterUser(emailReg,displayNameReg, passwordReg).then((res) => {
                    console.log(res);
                    setShowLogin(true);
                    setEmailReg("");
                    setdisplayNameReg("")
                    setPasswordReg("")
                 }).catch(function(error) {
                    alert("Register not working")
                  });
            }else{
                alert("First register not working")
            }
        })
        event.preventDefault();
    }

    const logout = async () =>{
        await firebase.auth().signOut();
    }

    function getPublicKey(){
        return fetch("http://localhost:3005/api/key").then(res => res.arrayBuffer())
            .then(key => new Uint8Array(key))
      }

    const sus = async() =>{
        getPublicKey().then(key => {
            props.swReg.pushManager.subscribe({
                userVisibleOnly:true,
                applicationServerKey:key
            }).then(res => res.toJSON()).then(sus => {
                console.log(sus);
                fetch("http://localhost:3005/api/subscribe", {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(sus)
                }).then(() => console.log("correcto"))
                .catch(() => console.log("correcto"))
            })
        });
    }
    return (
        <div>
            <button onClick={sus} className="btn-noti-desactivadas">Notificaciones Desactivadas</button>
            <div style={{display: showLogin ? "block":"none"}} >
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
                    </Form.Group>
                    <div style={{ textAlign: "center" }}>
                        <Button variant="link" onClick={() => setShowLogin(false)} >
                            Registrarse
                        </Button>
                    </div>
                </Form>
            </Container>
            </div>
            <div style={{display: showLogin ? "none":"block"}}>
            <Container style={{ maxWidth: "500px" }}>
            <div style={{ textAlign: "center" }}>
                <img src={Logo} alt="Logo WeStudy" style={{ width: "35%", height: "35%", marginBottom: "5%", marginTop: "10%", }} />
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="displayName" value={displayNameReg} placeholder="Ingresar su nombre" onChange={(e) => setdisplayNameReg(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control type="email"  value={emailReg} placeholder="Ingresar correo electrónico" onChange={(e) => setEmailReg(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña"  value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)}/>
                    <Button style={{ marginTop: "2%", width: "100%" }} variant="primary" type="submit" >
                        Registrarse
                 </Button>
                </Form.Group>
                <div style={{ textAlign: "center" }}>
                <Button variant="link" onClick={() => setShowLogin(true)} >
                            Iniciar Sesión
                        </Button>
                        </div>
            </Form>
        </Container>
            </div>
        </div>
    )
}
