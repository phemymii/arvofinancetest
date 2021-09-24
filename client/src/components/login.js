import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { setUser } from '../redux/Actions';
import store from '../redux/Store';
import {reactLocalStorage} from 'reactjs-localstorage';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  function handleSubmit(event) {
    event.preventDefault();
    const form ={email, password}
    fetch('http://localhost:4000/login',{
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(form),
    })
    .then(res => res.json())
    .then(resJson => {
      resJson.error ? alert(resJson.error.msg) : loggedIn(resJson)
      // console.log(resJson);
    })
    .catch(e => {
      // alert(e)
    })
  }

  const loggedIn = (data) =>{
    store.dispatch(setUser(data))
    reactLocalStorage.setObject('userData', data)
    window.location.replace("/dashboard")
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit} method="POST">
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg">
        <Button block  type={'submit'} disabled={!validateForm()}>
          Login
        </Button>
        </Form.Group>
      </Form>
    </div>
  );
}