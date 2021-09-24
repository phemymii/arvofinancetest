import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useLocation} from 'react-router-dom';


export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");


  function validateForm() {
    return email.length > 0 && password.length > 0 && name.length > 0;
  }

  console.log(window.location.search.replace('%20',' ').split('='));
  function handleSubmit(event) {
    event.preventDefault();
    if(password !== cpassword){
      return alert('Passwords do not match')
    } 
    const form ={ name, email, password, cpassword }
    fetch('http://localhost:4000/register'+ window.location.search,{
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(form),
    })
    .then(res => res.json())
    .then(resJson => {
      resJson.error ? alert(resJson.error.msg) : window.location.replace("/dashboard")
    })
    .catch(e => {
      // alert(e)
    })
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit} method="POST">
        <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group size="lg" controlId="cpassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg">
        <Button block type="submit" disabled={!validateForm()}>
          Login
        </Button>
        </Form.Group>
      </Form>
    </div>
  );
}