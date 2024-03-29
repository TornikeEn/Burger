import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from 'redux-thunk';

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducers = combineReducers({burgerBuilder: burgerBuilderReducer, order: orderReducer, auth: authReducer});

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));
 

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App appTitle="Person Manager"/>
        </BrowserRouter>
    </Provider>
);

createRoot(document.getElementById('root')).render(app);

registerServiceWorker();
