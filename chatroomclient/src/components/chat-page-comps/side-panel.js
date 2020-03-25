import React, {useState} from 'react';
import '../../CSS/chatroom.css';
import { useAuthContext } from "../../providers/AuthProvider";

export const SidePanel = props => {
    const [{ userManager, profile, idToken }] = useAuthContext();

    

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
                    <li className="contact active">
                        <div className="wrap">
                            <div className="meta">
                                <p className="name">Nějaký jméno asi Honza</p>
                                <p className="preview">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Integer lacinia. Integer malesuada.</p>
                            </div>
                        </div> 
                    </li>
                    <li className="contact">
                        <div className="wrap">
                            <div className="meta">
                                <p className="name">Blanka Protrhlá</p>
                                <p className="preview">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In convallis. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim</p>
                            </div>
                        </div> 
                    </li>
                    <li className="contact">
                        <div className="wrap">
                            <div className="meta">
                                <p className="name">Karel Kebab</p>
                                <p className="preview">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In convallis. Integer rutrum, orci vestibulum ullamcorper ultricies, lacus quam ultricies odio, vitae placerat pede sem sit amet enim</p>
                            </div>
                        </div> 
                    </li>
                </ul>
            </div>
            <div id="bottom-bar">
                <button id="addcontact" onClick={
                () => { userManager.signoutRedirect({ id_token_hint: idToken }); userManager.clearStaleState() }
            }><span>Odhlásit</span></button>
            </div>
        </div>);
}

export default SidePanel;