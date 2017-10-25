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
      password_confirmation: '',
      usernameExists: false,
      usernameError: 'This Username already exists. Please try another.',
      emailExists: false,
      emailError: 'This Email already exists. Please try another.'
    }
  }
 /*
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
*/

  handleInputChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var user =  {
        username: this.state.username,
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
    };
    axios.post('/signup', user)
    .then(response => {
      this.props.history.push("/auth/login");
    })
    .catch(error => {
      this.setState({
        ...this.state,
        usernameExists: error.response.data.message.includes('Username'),
        emailExists: error.response.data.message.includes('Email')
      });
    })
  }

  render () {
    return (
      <div>
        <h1>Register Now!</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField name="username" hintText="Username" errorText={this.state.usernameExists ? this.state.usernameError : ""} value={this.state.username} onChange={this.handleInputChange}/> <br />
          <TextField name="first_name" hintText="First Name" value={this.state.first_name} onChange={this.handleInputChange}/> <br />
          <TextField name="last_name" hintText="Last Name" value={this.state.last_name} onChange={this.handleInputChange}/> <br />
          <TextField name="email" type="email" hintText="Email" errorText={this.state.emailExists ? this.state.emailError : ""} value={this.state.email} onChange={this.handleInputChange}/> <br />
          <TextField name="password" type="password" hintText="Password" value={this.state.password} onChange={this.handleInputChange}/> <br />
          <TextField name="password_confirmation" type="password" hintText="Confirm Password" value={this.state.password_confirmation} onChange={this.handleInputChange}/> <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
      )
  }
}

export default UserRegistration;