import React, { Component } from 'react'
import axios from 'axios'
import TextField from 'material-ui/TextField'
var pointsFunction = require('../landingpage/ranklogic')

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      emailInvalid: false,
      passwordInvalid: false,
      errorMessage: '',
      redirectUrl: '/home'
    }
  }

  componentWillMount() {
    // Checks if user is already authenticated
    // If so, user is redirected to Landing page
    if (window.localStorage.auth_token) {
      this.props.history.push(this.state.redirectUrl);
    }
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({ ...this.state, redirectUrl: this.props.location.state.from.pathname})
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
      window.localStorage.user_bets = response.data.user_bets;
      return(response.data.user_id)
    })
    .then( (userId) => {
      this.props.handleLoginSuccess(userId)
      return
    })
    .then( () => {
      this.props.history.push(this.state.redirectUrl);
      window.location.reload()
    })
    .catch(error => {
      console.log(error)
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
        <h1><strong>Hello! Please Sign in Below</strong></h1>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="email"
            type="email"
            hintText="Email"
            errorText={this.state.emailInvalid ? this.state.errorMessage : ""}
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <br />
          <TextField
            name="password"
            type="password"
            hintText="Password"
            errorText={this.state.passwordInvalid ? this.state.errorMessage : ""}
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Login;
