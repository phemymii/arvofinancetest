import React, {useEffect, useState} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import store from '../redux/Store'
import {reactLocalStorage} from 'reactjs-localstorage';
import { Button, Form } from 'react-bootstrap';

 class JoinClub extends React.Component {
     constructor(props){
         super(props)
         this.state = {
            user: {},
            clubs: [],
            name: '',
            add: false
         }
     }

  componentDidMount(){
    const data = reactLocalStorage.getObject('userData')
    this.setState({user: data}, ()=>{
    })
    // console.log(window.location.search.split('=')[0]);
  }



  joinClub = () => {
    let {user, name} = this.state
    const form = {adminId:user.data.id, name}
    fetch('http://localhost:4000/addMember'+window.location.search,{
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-access-token': user.accessToken
        },
        body: JSON.stringify(form),
    })
    .then(res => res.json())
    .then(resJson => {
      resJson.error ? alert(resJson.error.msg) : this.success()
    })
    .catch(e => {
      // alert(e)
    })
  }

  success = () =>{
    alert('Joined club successfully')
    this.getClubs() 
  }

  render(){
    const validateForm = () => {
        return this.state.name.length > 0;
      }
    return (
        <div>
            <Button onClick={()=>this.joinClub()}>Join Club</Button>
        </div>
        
    );
  }
}

export default JoinClub;
