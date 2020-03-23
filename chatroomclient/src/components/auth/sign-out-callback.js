import React from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import { Redirect } from "react-router";

export const SignOutCallback = props => {
    const [{ userManager }] = useAuthContext();
    userManager.signoutRedirectCallback();
    return <Redirect to="/" />;
}

export default SignOutCallback;