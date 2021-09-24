import React, {useEffect, useState} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import store from '../redux/Store'
import {reactLocalStorage} from 'reactjs-localstorage';
import { Button, Form } from 'react-bootstrap';

 class Dashboard extends React.Component {
     constructor(props){
         super(props)
         this.state = {
            user: {},
            clubs: {},
            members : [],
            name: '',
            add: false
         }
     }

  componentDidMount(){
    const data = reactLocalStorage.getObject('userData')
    if(!data) return window.location.replace('/login')
    this.setState({user: data}, ()=>{
       this.getClubs() 
    })
  }

  getClubs = () => {
    let {user} = this.state
    const form = {adminId:user.data.id}
    fetch('http://localhost:4000/getClubs',{
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
      resJson.error ? alert(resJson.error.msg) : this.setState({clubs: resJson.clubs, members: resJson.members})
    })
    .catch(e => {
      // alert(e)
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let {user, name} = this.state
    const form = {adminId:user.data.id, name}
    fetch('http://localhost:4000/addClub',{
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
      resJson.error ? alert(resJson.error.msg) : alert('Club successfully created')
      this.getClubs() 
    })
    .catch(e => {
      // alert(e)
    })
  }

  deleteMember = (memberId) => {
      const{user} = this.state
    const form = {id: memberId}
    fetch('http://localhost:4000/deleteUser',{
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
      resJson.error ? alert(resJson.error.msg) : alert('Member successfully deleted')
      this.getClubs() 
    })
    .catch(e => {
      // alert(e)
    })
  }


  render(){
    const validateForm = () => {
        return this.state.name.length > 0;
      }
    return (
        <div>
            Welcome, {this.state.user && this.state.user.data ? this.state.user.data.name : null}
            <div>
               <Button onClick={()=>this.setState({add: !this.state.add})}>Add Club</Button>
            </div>
            <div style={this.state.add ? { marginTop: 30, display: 'block'} : {display:'none'}}>
            <Form onSubmit={this.handleSubmit} method="POST">
                <Form.Group size="lg" controlId="name">
                {/* <Form.Label>name</Form.Label> */}
                <Form.Control
                    autoFocus
                    type="text"
                    value={this.state.name}
                    onChange={(e) => this.setState({name: e.target.value})}
                    />
                    </Form.Group>
                    <Form.Group size="lg">
                    <Button block  type={'submit'} disabled={!validateForm()}>
                        Login
                    </Button>
                </Form.Group>
              </Form>
            </div>
            <div> {console.log(this.state.members)}
                Club: 
                {this.state.clubs  ? 
                    <ul><li>{this.state.clubs.name} <Button onClick={()=>alert("http://localhost:3000/joinclub?_id="+this.state.clubs._id+"&name="+this.state.user.data.name+"%club="+this.state.clubs.name)}>Invite Members</Button>
                   {this.state.members && this.state.members.length > 0 ? 
                   this.state.members.map((member, index)=>{return <ul><li>{member.name} <Button style={{fontSize: 10, background: 'brown'}} onClick={()=>{this.deleteMember(member._id)}}>Delete member</Button></li></ul>}): 'No memebers yet'}</li></ul> : 'No club added yet'}
                 
            </div>
        </div>
        
    );
  }
}

export default Dashboard;
