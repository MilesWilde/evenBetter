import React from 'react';
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const NavMenu = (props) => {
  return(
    <Drawer
      open={ props.open }
      docked={ false }
      onRequestChange={ props.handleRequestChange }
    >
      { props.currentUser ?
      [
        <Link to='/home'><MenuItem onClick={ props.handleNavMenuClose }>Home</MenuItem></Link>,
        <Link to='/'><MenuItem onClick={ props.handleNavMenuClose }>About</MenuItem></Link>
      ]
      :
      [
        <Link to='/login'><MenuItem onClick={ props.handleNavMenuClose }>Login</MenuItem></Link>,
        <Link to='/signup'><MenuItem onClick={ props.handleNavMenuClose }>Sign Up</MenuItem></Link>,
        <Link to='/'><MenuItem onClick={ props.handleNavMenuClose }>About</MenuItem></Link>
      ] }
    </Drawer>
  )
}

export default NavMenu
