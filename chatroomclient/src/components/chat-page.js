import React, { useState, useEffect } from 'react';
import * as signalR from '@aspnet/signalr';
import '../CSS/chatroom.css'
import { useAuthContext } from "../providers/AuthProvider";
import SidePanel from './chat-page-comps/side-panel';
import { useApplicationContext } from "../providers/ApplicationProvider";

const ChatPage = props => {
    const [{ userId, userManager, accessToken, idToken }] = useAuthContext();
    const [{ messages, active_user }, dispatch] = useApplicationContext();
    const [text, setText] = useState("");
    const [hubConnection, setHubConnection] = useState(null);

    useEffect(() => {
        const createHubConnection = async () => {
            const hubConnect = new signalR.HubConnectionBuilder()
                .withUrl("https://localhost:44350/messagehub")
                .configureLogging(signalR.LogLevel.Information)
                .build()
            try {
                hubConnect.start().then(function () {
                    console.log("connected to hub");
                    hubConnect.invoke('JoinChat', userId).catch(err => console.error(err));
                }).catch(function () {
                    console.log("Error while connecting to hub");
                });

                hubConnect.on('PostMessage', (userId, text) => {
                    dispatch({ type: "ADD_MESSAGE", payload: { text: text, isTargeted: true, userId: userId.result } });
                });
            }
            catch (err) {
                alert(err);
                console.log('Error while establishing connection: ' + { err })
            }
            setHubConnection(hubConnect);

        }
        createHubConnection();

    }, [userId, dispatch]);

    const invokeHubMessage = (text) => {
        hubConnection
            .invoke('PostMessage', String(active_user.id), String(text))
            .catch(err => console.error(err))
    }

    const postMessage = (senttext) => {
        if (senttext.replace(/\s+/g, '') !== "") {
            (async () => {
                invokeHubMessage(senttext);
                setText("");
                const res = await fetch(process.env.REACT_APP_API_URL + "/message", {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + idToken,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        targetuserid: active_user.id,
                        text: senttext
                    })
                });
                if (res.ok) {
                    dispatch({ type: "ADD_MESSAGE", payload: { text: senttext, isTargeted: false, userId: userId } });
                } else {
                    console.log("error");
                }
            })();
        }
    }

    const postMessageEnter = (event) => {
        if (event.key === "Enter") {
            postMessage(text);
        }
    }

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
                            <input type="text" placeholder="Write your message..." value={text} onChange={e => { setText(e.target.value) }} onKeyPress={postMessageEnter} />
                            <button className="submit" type="reset" onClick={() => postMessage(text)}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatPage;
