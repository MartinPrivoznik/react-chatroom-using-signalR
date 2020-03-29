import React from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import { Redirect } from "react-router";

export const SilentRenew = props => {
    const [{ userManager }] = useAuthContext();
    userManager.signinSilentCallback();
    return <Redirect to="/chat" />;
}

export default SilentRenew;