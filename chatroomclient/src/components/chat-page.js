import React from 'react';
import '../CSS/chatroom.css'
import { useAuthContext } from "../providers/AuthProvider";
import SidePanel from './chat-page-comps/side-panel';
import { useApplicationContext } from "../providers/ApplicationProvider";

const ChatPage = props => {
    const [{ userManager, accessToken }] = useAuthContext();
    const [{ messages, active_user }] = useApplicationContext();

    let messagesWindows = [];
    for (let i = 0; i < messages.length; i++) {
        messagesWindows.push(
            <li className={messages[i].isTargeted ? "replies" : "sent"} key={i}>
                <p>{messages[i].text}</p>
            </li>
        )
    }

    if (accessToken === null) {
        return (
            <div>
                <center>
                    <p className="w3-padding-16"><button className="w3-button w3-black" onClick={() => { userManager.signinRedirect() }}>Login via oauth.pslib.cloud</button></p>
                </center>
            </div>
        );
    }
    else {
        return (
            <div id="frame">
                <SidePanel />
                <div className="content">
                    <div className="contact-profile">
                        <p>{active_user.wholeName}</p>
                    </div>
                    <div className="messages">
                        <ul>
                            {messagesWindows}
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
