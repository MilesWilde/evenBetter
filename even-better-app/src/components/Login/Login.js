import React, { Component } from 'react'
import axios from 'axios'
import TextField from 'material-ui/TextField'
import Container from 'muicss/lib/react/container'
import Col from 'muicss/lib/react/col'
import RaisedButton from 'material-ui/RaisedButton';
import './login.css'
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
    axios.post('/login', user)
    .then(response => {
      window.localStorage.auth_token = response.data.auth_token;
      window.localStorage.user_id = response.data.user_id;
      window.localStorage.user_bets = response.data.user_bets;
      window.localStorage.username = response.data.username;
      return(response.data)
    })
    .then( (userData) => {
      this.props.handleLoginSuccess(userData.user_id, userData.username)
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
      <Container
      className="login-container"
      fluid={true}
      style={{backgroundColor: '#E0E0E0'}}
      >
        <Col md="4"
        className="side-column"
        />
        <Col md="4"
        >
          <div>
            <h1 style={{color: "#455A64"}}><strong>Hello! Please Sign in Below</strong></h1>
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
                <RaisedButton
                  type="Submit"
                  label="Submit"
                  fullWidth= {true}
                  onClick={this.handleSubmit}
                  primary="true" />
            </form>
          </div>
        </Col>
        <Col
        className="side-column"
        md="4" />
      </Container>
    )
  }
}

export default Login;
