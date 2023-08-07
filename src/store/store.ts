import { applyMiddleware, compose, createStore } from "redux";
import { chatReducer } from "./chatReducer";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [thunk];

const store = createStore(chatReducer, composeWithDevTools(
    applyMiddleware(...middlewares)));


export type AppStore = ReturnType<typeof store.getState>

export default store;