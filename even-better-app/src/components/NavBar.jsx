import React from 'react'
import { Link } from 'react-router-dom'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';

const styles = {
  bar: {
    backgroundColor: '#263238',
    position: 'fixed'
  },
  button: {
    marginTop: '5px'
  }
}

const NavBar = (props) => {
  return(
    <AppBar
      title={<Link to='/home'>Even Better</Link>}
      style={ styles.bar }
      onLeftIconButtonTouchTap={ props.handleNavMenuOpen }
      showMenuIconButton={ false }
      iconElementRight={
        props.currentUser ?
        <div>
          <FlatButton label="Home" style={ styles.button } primary={true} containerElement={<Link to='/home'/>} />
          <FlatButton label="About" style={ styles.button } primary={true} containerElement={<Link to='/'/>} />
        </div>
      :
        <div>
          <FlatButton label="Login" style={ styles.button } primary={true} containerElement={<Link to='/login'/>} />
          <FlatButton label="Sign Up" style={ styles.button } primary={true} containerElement={<Link to='/signup'/>} />
          <FlatButton label="About" style={ styles.button } primary={true} containerElement={<Link to='/'/>} />
        </div>
      }
    />
  )
}

export default NavBar
