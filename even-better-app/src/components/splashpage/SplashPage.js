import React, { Component } from 'react'
import '../../App.css'
import './Splash.css'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';
import $ from 'jquery'; 
//Smooth scolling to section of the page


class SplashPage extends Component {

  componentWillMount() {
    $(this).on('click', 'a', function(event){
        event.preventDefault(); //To prevent any other link attachement apart from being scrolled to

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 1200);
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        {/* <div className="top-nav">
          <a href="#information">Info</a>
        </div> */}
        <div className="top">
          <img className="top-image" src ="https://www.playnbrag.com/blog/wp-content/uploads/2017/01/sports-betting-marketing-strategies.jpg" />
        </div>

        <div id="information" className="container">
          <div className="left-pane">
            <p>Sports</p>
            <div className="text-div">

              EvenBetter offers two ways to bet: sports betting, or between your friends! Someone constantly late? 
              Bet on them! Is an election coming up? You know what to do.
            </div> 
           </div>
          <div className="middle-pane">
            <p>Personal</p>
            <div className="text-div">
              If you have made a bet between friends, a chatroom will be available for everyone involved for discussion.
            </div>
          </div> 
          <div className="right-pane">
            <p>Chat</p>
            <div className="text-div">
              When you sign up you are given 1000 points. Every day you 
              can collect 100 points! Under your
              profile there is a statistics page. View
              leaderboards with various statistics surrounding the top betters!
            </div>
          </div> 
        </div>
        <div className="footer-bar">
          Copyright Info
        </div>
      </MuiThemeProvider>
    );
  }
}

export default SplashPage