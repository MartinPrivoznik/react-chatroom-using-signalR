import React from 'react';
import '../App.css';
import { useAuthContext } from "../providers/AuthProvider";
import { Redirect } from "react-router";

const footerstyle = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
}
const headerstyle = {
  padding: '50px'
}

const bodystyle = {
  'fontFamily': "Montserrat, sans-serif"
}

const MainPage = props => {
  const [{ accessToken, userManager }] = useAuthContext();
  if (accessToken === null)
    {
      return (
      <div className="App" style={bodystyle}>
          <div className="w3-content">
              <div className="w3-opacity">
                  <div className="w3-clear"></div>
                  <header className="w3-center w3-margin-bottom" style={headerstyle}>
                      <h1 style={bodystyle}><b>Messenger v2.0</b></h1>
                      <p><b>A chatroom designed for pslib.</b></p>
                      <p className="w3-padding-16"><button className="w3-button w3-black" onClick={() => { userManager.signinRedirect()}}>Login via oauth.pslib.cloud</button></p>
              </header>
              </div>
          </div>
          <footer className="w3-container w3-padding-64 w3-light-grey w3-center w3-opacity w3-xlarge" style={footerstyle}> 
              <a href="https://www.linkedin.com/in/martin-p%C5%99%C3%ADvozn%C3%ADk-5b16a0192/" target="_blank" rel="noopener noreferrer"> <i className="fa fa-linkedin w3-hover-opacity"></i> </a>
              <a href="https://github.com/MartinPrivoznik" target="_blank" rel="noopener noreferrer"> <i className="fa fa-github w3-hover-opacity"></i> </a>
              <p className="w3-medium">© 2020. All Rights Reserved. <br/> Messenger v2.0 by Martin Přívozník </p>
          </footer>
      </div>
      );
    }
  else {
    return (
      <Redirect to="/chat" />
    );
  }
}

export default MainPage;
