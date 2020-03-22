import React, { useReducer, createContext, useContext, useEffect } from "react";
import { IDENTITY_CONFIGURATION, METADATA_OIDC } from "../configuration/auth";
import { UserManager, WebStorageStateStore } from "oidc-client";

export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const CLEAR_ACCESS_TOKEN = "CLEAR_ACCESS_TOKEN";
export const SET_ID_TOKEN = "SET_ID_TOKEN";
export const CLEAR_ID_TOKEN = "CLEAR_ID_TOKEN";
export const USER_EXPIRED = "USER_EXPIRED";
export const USER_FOUND = "USER_FOUND";
export const USER_EXPIRING = "USER_EXPIRING";
export const LOADING_USER = "LOADING_USER";
export const SILENT_RENEW_ERROR = "SILENT_RENEW_ERROR";
export const SESSION_TERMINATED = "SESSION_TERMINATED";
export const LOAD_USER_ERROR = "LOAD_USER_ERROR";
export const USER_SIGNED_OUT = "USER_SIGNED_OUT";

const userStore = window.localStorage;

export const userManager = new UserManager({
    ...IDENTITY_CONFIGURATION,
    userStore: new WebStorageStateStore({ store: userStore }),
    metadata: {
        ...METADATA_OIDC
    }
});

const reducer = (state, action) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return { ...state, accessToken: action.payload }
        case CLEAR_ACCESS_TOKEN:
            return { ...state, accessToken: null }
        case SET_ID_TOKEN:
            return { ...state, idToken: action.payload }
        case CLEAR_ID_TOKEN:
            return { ...state, idToken: null }
        case USER_FOUND:
            return { ...state, idToken: action.idToken, accessToken: action.accessToken, userId: action.userId, profile: action.profile, isUserLoading: false }
        case USER_EXPIRED:
        case LOAD_USER_ERROR:
        case SILENT_RENEW_ERROR:
        case USER_SIGNED_OUT:
        case SESSION_TERMINATED:
            return { ...state, idToken: null, accessToken: null, userId: null, profile: null, isUserLoading: false }
        default:
            return state;
    }
}

const parseJwt = token => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
};

const initialState = {
    userManager: userManager,
    accessToken: null,
    idToken: null,
    userId: null,
    profile: null,
    isUserLoading: false
};

export const AuthContext = createContext(initialState);
export const AuthConsumer = AuthContext.Consumer;
export const AuthProvider = props => {
    const store = useReducer(
        reducer,
        initialState
    );
    const [, dispatchAuth] = store;
    useEffect(() => {
        userManager.events.addUserLoaded(user => {
            const tokenData = parseJwt(user.access_token);
            console.log("USER_FOUND");
            dispatchAuth({ type: USER_FOUND, accessToken: user.access_token, idToken: user.id_token, userId: tokenData.sub, profile: user.profile });
        });
        userManager.events.addUserUnloaded(() => {
            console.log("USER_EXPIRED");
            dispatchAuth({ type: USER_EXPIRED });
        });
        userManager.events.addAccessTokenExpiring(() => {
            console.log("USER_EXPIRING");
            dispatchAuth({ type: USER_EXPIRING });
        });
        userManager.events.addAccessTokenExpired(() => {
            console.log("USER_EXPIRED");
            dispatchAuth({ type: USER_EXPIRED });
        });
        userManager.events.addSilentRenewError(() => {
            console.log("SILENT_RENEW_ERROR");
            dispatchAuth({ type: SILENT_RENEW_ERROR });
        });
        userManager.events.addUserSignedOut(() => {
            console.log("USER_SIGNED_OUT");
            dispatchAuth({ type: USER_SIGNED_OUT });
        });

        userManager.getUser()
            .then((user) => {
                if (user && !user.expired) {
                    let tokenData = parseJwt(user.access_token);
                    dispatchAuth({ type: USER_FOUND, accessToken: user.access_token, idToken: user.id_token, userId: tokenData.sub, profile: user.profile });
                } else if (!user || (user && user.expired)) {
                    dispatchAuth({ type: USER_EXPIRED });
                }
            })
            .catch(() => {
                dispatchAuth({ type: LOAD_USER_ERROR });
            });

    }, [dispatchAuth]);
    return (
        <AuthContext.Provider value={store}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);