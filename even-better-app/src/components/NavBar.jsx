import React from 'react'
import { Link } from 'react-router-dom'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton';

const NavBar = (props) => {
  return(
    <Toolbar>
      <ToolbarGroup>
        <ToolbarTitle text='Even Better' />
      </ToolbarGroup>
      { props.currentUser ?
      <ToolbarGroup>
        <RaisedButton label="Home" primary={true} containerElement={<Link to='/home'/>} />
        <RaisedButton label="About" primary={true} containerElement={<Link to='/'/>} />
      </ToolbarGroup>
      :
      <ToolbarGroup>
        <RaisedButton label="Login" primary={true} containerElement={<Link to='/login'/>} />
        <RaisedButton label="Sign Up" primary={true} containerElement={<Link to='/signup'/>} />
        <RaisedButton label="About" primary={true} containerElement={<Link to='/'/>} />
      </ToolbarGroup> }
    </Toolbar>
  )
}

export default NavBar
