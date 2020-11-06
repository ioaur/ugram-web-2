import React from "react";
import { Provider } from "react-redux";
import configureStore, { StoreContext } from "./store";
import App from "./App";

const Root = () => {
    const StoreProvider = (props: any) => {
        const store = configureStore();

        return (
            <StoreContext.Provider value={store}>
                <Provider store={store}>{props.children}</Provider>
            </StoreContext.Provider>
        );
    };

    return (
        <StoreProvider>
            <App />
        </StoreProvider>
    );
};

export default Root;
