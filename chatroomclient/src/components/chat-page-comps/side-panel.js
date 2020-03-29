import React, { useState } from 'react';
import '../../CSS/chatroom.css';
import { useAuthContext } from "../../providers/AuthProvider";

export const SidePanel = props => {
    const [{ userManager, profile, idToken }] = useAuthContext();
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [conversations, setConversations] = useState([]);

    const getUsers = () => {
        (async () => {
            const res = await fetch(process.env.REACT_APP_API_URL + "/user" ,{
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
                    convos.push(
                        <li className="contact" key = {index}>
                            <div className="wrap">
                                <div className="meta">
                                    <p className="name">{users[index].givenName} {users[index].middleName} {users[index].lastName}</p>
                                    <p className="preview">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Integer lacinia. Integer malesuada.</p>
                                </div>
                            </div> 
                        </li>
                    );
                  }
                  setConversations(convos);
                  setUsersLoaded(true);

            } else {
                console.log("error");
            }
        })();
    }

    if(!usersLoaded)
    {
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
    else
    {
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
                <ul style={{"listStyleType" : 'none', "paddingLeft": "0px"}}>
                    {conversations}
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