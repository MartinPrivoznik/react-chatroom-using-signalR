import React, { useState } from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import { Redirect } from "react-router";

export const SignInCallback = props => {
    const [{ userId, userManager, accessToken, profile, idToken }] = useAuthContext();
    const [callbacked, setCallback] = useState(false);

    const postUser = () => {
        (async () => {
            const res = await fetch(process.env.REACT_APP_API_URL + "/user", {
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
                // ... 
            } else {
                console.log("error");
            }
        })();
    }

    if (accessToken === null) {
        if (callbacked === false) {
            userManager.signinRedirectCallback();
            setCallback(true);
        }
        return <div><center><h2>Loading</h2></center></div>;
    }
    else {
        postUser();
        return <Redirect to="/chat" />;
    }
}

export default SignInCallback;