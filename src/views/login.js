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
import { RegisterUser, LDAPAuthUser, LDAPCreateUser, SubscribeUser } from '../helpers';


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
        // return fetch("http://ec2-54-92-227-88.compute-1.amazonaws.com:3005/api/key").then(res => res.arrayBuffer())
        //     .then(key => new Uint8Array(key))
        return new Uint8Array([4, 228, 238, 51, 173, 81, 218, 100, 221, 83, 177, 211, 48, 44, 205, 72, 48, 128, 62, 78, 248, 163, 242, 34, 68, 14, 40, 201, 63, 212, 223, 225, 178, 83, 43, 33, 112, 84, 173, 215, 164, 134, 168, 104, 19, 228, 145, 183, 221, 220, 140, 10, 40, 33, 19, 218, 13, 152, 206, 214, 73, 152, 201, 72, 60])
      }

    const sus = async() =>{ 
        let key = getPublicKey();
            console.log(key);
            props.swReg.pushManager.subscribe({
                userVisibleOnly:true,
                applicationServerKey:key
            }).then(res => res.toJSON()).then(sus => {
                console.log(JSON.stringify(sus));
                SubscribeUser(sus,user.ya).then((res) => {
                    console.log("listo!")
                })
            })
       
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
