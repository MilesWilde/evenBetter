import React, { Component } from 'react'
import '../../App.css'
import '../../Splash.css'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';
import $ from 'jquery'; 
//Smooth scolling to section of the page

$(document).on('click', 'a', function(event){
    event.preventDefault(); //To prevent any other link attachement apart from being scrolled to

    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 1200);
});

class SplashPage extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          style={{position:'fixed'}}
          title='EvenBetter'
          iconClassNameRight='muidocs-icon-navigation-expand-more'
          iconElementRight={
            <div>
              <FlatButton label="Sign In" />
              <FlatButton label="Register" />
            </div>
          }
        />
        <div id="top">
          <center>
            <img id="top-image" src ="https://fthmb.tqn.com/tLrasJkIfuzOpe8lclrJY66lcMQ=/768x0/filters:no_upscale()/sports_betting_board_78396227-56a8f1955f9b58b7d0f69d65.jpg" />
          </center>
          <div id="top-nav">

            <a href="#information">Info</a>
          </div>
        </div>
        <div id="information" className="container">
          <div id="left-pane">
            <img src ="https://betoclock.com/wp-content/uploads/2015/01/betting_3.jpg" height="65" width="85" />
            <div className="text-div">

              EvenBetter offers two ways to bet: sports betting, or between your friends! Someone constantly late? 
              Bet on them! Is an election coming up? You know what to do.
            </div> 
           </div>
          <div id="middle-pane">
            <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/3766-200.png" height="65" width="65" />
            <div className="text-div">
              If you have made a personal bet between friends, a chatroom will be available for everyone to discuss.
            </div>
          </div> 
          <div id="right-pane">
            <img src="http://www.publicdomainpictures.net/pictures/130000/velka/clip-art-smiley-face.jpg" height="65" width="81" />
            <div className="text-div">
              When you sign up you are given 1000 points. Every day you 
              can collect 100 points! Under your
              profile there is a statistics page. View
              leaderboards with various statistics surrounding the top betters!
            </div>
          </div> 
        </div>
        <div id="footer-bar">
          Copyright Info
        </div>
      </MuiThemeProvider>
    );
  }
}

export default SplashPage