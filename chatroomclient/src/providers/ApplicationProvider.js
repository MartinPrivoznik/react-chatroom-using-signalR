import React, { useReducer, createContext, useContext } from "react";
import chatModel from '../model/chat-model';

export const SET_TITLE = "SET_TITLE";
export const SET_USER_SIGNED = "SET_USER_SIGNED";

const initialState = chatModel.initialize();

const reducer = (state, action) => {
    switch (action.type) {
        case SET_USER_SIGNED: {
            return { ...state, userSigned: action.payload };
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