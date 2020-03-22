import React, { useReducer, createContext, useContext } from "react";

export const SET_TITLE = "SET_TITLE";

const initialState = { title: "" };

const reducer = (state, action) => {
    switch (action.type) {
        case SET_TITLE: {
            return { ...state, title: action.payload };
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