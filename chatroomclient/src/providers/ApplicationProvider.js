import React, { useReducer, createContext, useContext } from "react";
import chatModel from '../model/chat-model';

export const SET_USER_SIGNED = "SET_USER_SIGNED";
export const SWITCH_USER = "SWITCH_USER";
export const SET_USERS_LOADED = "SET_USERS_LOADED";
export const LOAD_CONVERSATIONS = "LOAD_CONVERSATIONS";
export const FILTER_USERS = "FILTER_USERS";

const initialState = chatModel.initialize();

const reducer = (state, action) => {

    let model = new chatModel(state);

    switch (action.type) {
        case SET_USER_SIGNED: {
            return { ...state, userSigned: action.payload };
        }
        case SWITCH_USER: {
            return { ...state, active_user: action.payload };
        }
        case SET_USERS_LOADED: {
            return { ...state, usersLoaded: action.payload };
        }
        case LOAD_CONVERSATIONS: {
            model.LoadConversations(action.payload.convos);
            return model;
        }
        case FILTER_USERS: {
            model.Filter(action.payload);
            return model;
        }
        default: {
            return state;
        }
    }
}

export const ApplicationContext = createContext(initialState);
export const ApplicationConsumer = ApplicationContext.Consumer;
export const ApplicationProvider = props => {
    const store = useReducer(
        reducer,
        initialState
    );
    return (
        <ApplicationContext.Provider value={store}>
            {props.children}
        </ApplicationContext.Provider>
    );
}

export const useApplicationContext = () => useContext(ApplicationContext);