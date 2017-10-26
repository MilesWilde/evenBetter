import React, { Component } from 'react'
import axios from 'axios'
import TextField from 'material-ui/TextField'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      emailInvalid: false,
      passwordInvalid: false,
      errorMessage: ''
    }
  }

  componentWillMount() {
    // Checks if user is already authenticated
    // If so, user is redirected to Landing page
    if (window.localStorage.auth_token) {
      this.props.history.push("/landing");
    }
  }

  handleInputChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var user =  {
        email: this.state.email,
        password: this.state.password,
    };
    axios.post('/auth/login', user)
    .then(response => {
      window.localStorage.auth_token = response.data.auth_token;
      window.localStorage.user_id = response.data.user_id;
      window.localStorage.user_points = response.data.user_points;
      window.localStorage.user_bets = response.data.user_bets;
      window.localStorage.first_name = response.data.first_name;
      window.localStorage.last_name = response.data.last_name;
      this.props.history.push("/landing");
    })
    .catch(error => {
      this.setState({
        ...this.state,
        emailInvalid: error.response.data.message.includes('email'),
        passwordInvalid: error.response.data.message.includes('password'),
        errorMessage: error.response.data.message
      });
    })
  }

  render () {
    return (
      <div>
        <h1>Log in you piece of garbage!</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField name="email" type="email" hintText="Email" errorText={this.state.emailInvalid ? this.state.errorMessage : ""} value={this.state.email} onChange={this.handleInputChange}/> <br />
          <TextField name="password" type="password" hintText="Password" errorText={this.state.passwordInvalid ? this.state.errorMessage : ""} value={this.state.password} onChange={this.handleInputChange}/> <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Login;
