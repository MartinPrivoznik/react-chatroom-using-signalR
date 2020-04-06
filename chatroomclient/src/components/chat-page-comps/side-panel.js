import React from 'react';
import '../../CSS/chatroom.css';
import { useAuthContext } from "../../providers/AuthProvider";
import { useApplicationContext } from "../../providers/ApplicationProvider";

export const SidePanel = props => {
    const [{ userManager, profile, idToken }] = useAuthContext();
    const [{ usersLoaded, active_user, filtered_chats }, dispatch] = useApplicationContext();

    const isEmptyOrSpaces = str => {
        return str === null || str.match(/^ *$/) !== null;
    }

    const getUsers = () => {
        (async () => {
            const res = await fetch(process.env.REACT_APP_API_URL + "/user", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + idToken,
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                const users = await res.json();
                let convos = [];
                for (let index = 0; index < users.length; index++) {
                    convos.push({
                        id: users[index].id,
                        wholeName: isEmptyOrSpaces(users[index].middleName) ? users[index].givenName + " " + users[index].lastName : users[index].givenName + " " + users[index].middleName + " " + users[index].lastName,
                        lastMessage: users[index].lastMessage
                    }
                    );
                }
                convos.sort(function (a, b) {
                    var dateA = new Date(a.lastMessage.date), dateB = new Date(b.lastMessage.date);
                    return dateB - dateA;
                });
                dispatch({ type: "SET_USERS_LOADED", payload: true });
                dispatch({ type: "LOAD_CONVERSATIONS", payload: { convos } });
                getMessages(convos[0].id);
            } else {
                console.log("error");
            }
        })();
    }

    const getMessages = (targetId) => {
        (async () => {
            const res = await fetch(process.env.REACT_APP_API_URL + "/message/" + targetId, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + idToken,
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                const messages = await res.json();
                dispatch({ type: "SET_CHAT_LOADED", payload: true });
                dispatch({ type: "LOAD_CHAT", payload: messages });
            } else {
                console.log("error");
            }
        })();
    }

    let convosWindow = [];
    for (let i = 0; i < filtered_chats.length; i++) {
        convosWindow.push(
            <li className={active_user === filtered_chats[i] ? "contact active" : "contact"} key={i} onClick={() => { dispatch({ type: "SWITCH_USER", payload: filtered_chats[i] }); getMessages(filtered_chats[i].id); }}>
                <div className="wrap">
                    <div className="meta">
                        <p className="name">{filtered_chats[i].wholeName}</p>
                        <p className="preview">{filtered_chats[i].lastMessage.text}</p>
                    </div>
                </div>
            </li>
        )
    }

    if (!usersLoaded) {
        getUsers();
        return (
            <div id="sidepanel">
                <div id="profile">
                    <div className="wrap">
                        <h3>Loading users...</h3>
                    </div>
                </div>
                <div id="bottom-bar">
                    <button id="addcontact" onClick={
                        () => { userManager.signoutRedirect({ id_token_hint: idToken }); userManager.clearStaleState() }
                    }><span>Logout</span></button>
                </div>
            </div>
        );
    }
    else {
        return (
            <div id="sidepanel">
                <div id="profile">
                    <div className="wrap">
                        <h3>{profile.given_name} {profile.middle_name} {profile.family_name}</h3>
                    </div>
                </div>
                <div id="search">
                    <label htmlFor=""><i className="fa fa-search" aria-hidden="true"></i></label>
                    <input type="text" placeholder="Search contacts..." onChange={e => { dispatch({ type: "FILTER_USERS", payload: e.target.value }) }} />
                </div>
                <div id="contacts">
                    <ul style={{ "listStyleType": 'none', "paddingLeft": "0px" }}>
                        {convosWindow}
                    </ul>
                </div>
                <div id="bottom-bar">
                    <button id="addcontact" onClick={
                        () => { userManager.signoutRedirect({ id_token_hint: idToken }); userManager.clearStaleState() }
                    }><span>Logout</span></button>
                </div>
            </div>);
    }
}

export default SidePanel;