import React, {useState} from 'react';
import '../CSS/chatroom.css'
import { useAuthContext } from "../providers/AuthProvider";
import SidePanel from './chat-page-comps/side-panel';

const ChatPage = props => {
    const [{ userId, userManager, accessToken, profile, idToken }] = useAuthContext();
    const [userSigned, setUserSigned] = useState(false);

    const postUser = () => {
        (async () => {
            console.log(profile);
            const res = await fetch(process.env.REACT_APP_API_URL + "/user" ,{
                method: "POST",
                headers: {
                    Authorization: "Bearer " + idToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: userId,
                    givenname: profile.given_name,
                    middlename: profile.middle_name,
                    lastname: profile.family_name,
                    gender: profile.gender,
                    preferredusername: profile.preferred_username
                })
            });
            if (res.ok) {
                const json = await res.json();
            } else {
                console.log("error");
            }
        })();
    }

    if(accessToken !== null && userSigned === false)
    {
        setUserSigned(true);
        postUser();
    }

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
    //   <div className="App">
    //       {userId} <br/>
    //       {profile.given_name} <br/>
    //       {profile.family_name} <br/>
    //       {profile.gender} <br/>
    //       {profile.preferred_username} <br/>
    //       {accessToken} <br/>
    //       {idToken} <br/>
    //       <button onClick={
    //                     () => { userManager.signoutRedirect({ id_token_hint: idToken }); userManager.clearStaleState() }
    //                 }>Odhlásit</button>
    //   </div>
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
  