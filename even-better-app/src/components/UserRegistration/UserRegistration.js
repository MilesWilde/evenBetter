import React, { Component } from 'react'
import axios from 'axios'
import TextField from 'material-ui/TextField'

class UserRegistration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleUsernameChange = (e) => {
    this.setState({username: e.target.value})
  }

  handleFirstNameChange = (e) => {
    this.setState({first_name: e.target.value})
  }

  handleLastNameChange = (e) => {
    this.setState({last_name: e.target.value})
  }

  handleEmailChange = (e) => {
     this.setState({email: e.target.value});
  }

  handlePasswordChange = (e) => {
     this.setState({password: e.target.value});
  }

  handlePasswordConfirmationChange = (e) => {
     this.setState({password_confirmation: e.target.value});
  }

  // handleInputChange = function(e) {
  //   this.setState({[e.target.name]: e.target.value})
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    var user =  {
        username: "jbates",
        email: "jasonbateman@gmail.com",
        first_name: "Jason",
        last_name: "Bateman",
        password: "12345",
        password_confirmation: "12345"
    };
    axios.post('/signup', this.state)
    .then(response => {
      console.log(response)
    })
  }

  render () {
    return (
      <div>
        <h1>Register Now!</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField name="username" hintText="Username" value={this.state.username} onChange={this.handleUsernameChange}/> <br />
          <TextField name="first_name" hintText="First Name" value={this.state.first_name} onChange={this.handleFirstNameChange}/> <br />
          <TextField name="last_name" hintText="Last Name" value={this.state.last_name} onChange={this.handleLastNameChange}/> <br />
          <TextField name="email" type="email" hintText="Email" value={this.state.email} onChange={this.handleEmailChange}/> <br />
          <TextField name="password" type="password" hintText="Password" value={this.state.password} onChange={this.handlePasswordChange}/> <br />
          <TextField name="password_confirmation" type="password" hintText="Confirm Password" value={this.state.password_confirmation} onChange={this.handlePasswordConfirmationChange}/> <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
      )
  }
}

export default UserRegistration;