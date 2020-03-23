import React, {useState} from 'react';
import '../App.css';
import { useAuthContext } from "../providers/AuthProvider";

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
                console.log(json);
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
      <div className="App">
          {userId} <br/>
          {profile.given_name} <br/>
          {profile.family_name} <br/>
          {profile.gender} <br/>
          {profile.preferred_username} <br/>
          {accessToken} <br/>
          {idToken} <br/>
          <button onClick={
                        () => { userManager.signoutRedirect({ id_token_hint: idToken }); userManager.clearStaleState() }
                    }>Odhlásit</button>
      </div>
      );
    }
  }
  
  export default ChatPage;
  