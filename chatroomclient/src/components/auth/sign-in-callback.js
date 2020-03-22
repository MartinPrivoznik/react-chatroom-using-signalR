import React from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import { Redirect } from "react-router";

export const SignInCallback = props => {
    const [{ userManager }] = useAuthContext();
    userManager.signinRedirectCallback();
    return <Redirect to="/" />;
}

export default SignInCallback;