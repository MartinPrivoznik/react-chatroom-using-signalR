import React from 'react';
import '../CSS/chatroom.css'
import { useAuthContext } from "../providers/AuthProvider";
import SidePanel from './chat-page-comps/side-panel';

const ChatPage = props => {
    const [{ userManager, accessToken}] = useAuthContext();

    if (accessToken === null)
    {
        return (
            <div>
                <center>
                 <p className="w3-padding-16"><button className="w3-button w3-black" onClick={() => { userManager.signinRedirect()}}>Login via oauth.pslib.cloud</button></p>
                 </center>
            </div>
        );
    }
    else 
    {
      return (
        <div id="frame">
            <SidePanel/>
            <div className="content">
                <div className="contact-profile">
                    <p>Nějaký jméno asi Honza</p>
                </div>
                <div className="messages">
                    <ul>
                        <li className="sent">
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In convallis. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim. Praesent vitae arcu tempor neque lacinia pretium. Mauris metus. Cum sociis natoque penatibus et magnis dis parturient montes</p>
                        </li>
                        <li className="replies">
                            <p>nascetur ridiculus mus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Nullam faucibus mi quis velit. Aliquam erat volutpat. Integer in sapien. Maecenas sollicitudin. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor.</p>
                        </li>
                        <li className="replies">
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </li>
                        <li className="sent">
                            <p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Integer lacinia. Integer malesuada.</p>
                        </li>
                    </ul>
                </div>
                <div className="message-input">
                    <div className="wrap">
                    <input type="text" placeholder="Write your message..." />
                    <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>
      );
    }
  }
  
  export default ChatPage;
  