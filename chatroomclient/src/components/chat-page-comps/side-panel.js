import React from 'react';
import '../../CSS/chatroom.css';
import { useAuthContext } from "../../providers/AuthProvider";
import { useApplicationContext } from "../../providers/ApplicationProvider";

export const SidePanel = props => {
    const [{ userManager, profile, idToken }] = useAuthContext();
    const [{ usersLoaded, active_user, chats }, dispatch] = useApplicationContext();

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
                        wholeName: users[index].givenName + " " + users[index].middleName + " " + users[index].lastName,
                        lastMessage: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Integer lacinia. Integer malesuada."
                    }
                    );
                }
                dispatch({ type: "SET_USERS_LOADED", payload: true });
                dispatch({ type: "LOAD_CONVERSATIONS", payload: { convos } });
            } else {
                console.log("error");
            }
        })();
    }

    let convosWindow = [];
    for (let i = 0; i < chats.length; i++) {
        convosWindow.push(
            <li className={active_user === chats[i] ? "contact active" : "contact"} key={i} onClick={() => { dispatch({ type: "SWITCH_USER", payload: chats[i] }) }}>
                <div className="wrap">
                    <div className="meta">
                        <p className="name">{chats[i].wholeName}</p>
                        <p className="preview">{chats[i].lastMessage}</p>
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
                    }><span>Odhlásit</span></button>
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
                    <input type="text" placeholder="Search contacts..." />
                </div>
                <div id="contacts">
                    <ul style={{ "listStyleType": 'none', "paddingLeft": "0px" }}>
                        {convosWindow}
                    </ul>
                </div>
                <div id="bottom-bar">
                    <button id="addcontact" onClick={
                        () => { userManager.signoutRedirect({ id_token_hint: idToken }); userManager.clearStaleState() }
                    }><span>Odhlásit</span></button>
                </div>
            </div>);
    }
}

export default SidePanel;