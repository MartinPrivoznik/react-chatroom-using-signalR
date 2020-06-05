import React from 'react';
import { useAuthContext } from "../providers/AuthProvider";

const Unauthorized = props => {
    const [{ userManager }] = useAuthContext();

    return (
        <>
            <h1>Přístup odepřen.</h1> <br />
            <p className="w3-padding-16"><button className="w3-button w3-black" onClick={() => { userManager.signinRedirect() }}>Login via oauth.pslib.cloud</button></p>
        </>
    );
};

export default Unauthorized;