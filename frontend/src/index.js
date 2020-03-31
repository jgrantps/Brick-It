import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import './assets/main.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import service from './classes/service'

const persistedState = service.loadFromLocalStorage();

const combinedMiddleware = compose(applyMiddleware(thunk), composeWithDevTools())

const store = createStore(rootReducer, persistedState, combinedMiddleware)
// const store = createStore(rootReducer, combinedMiddleware)


store.subscribe(()=> service.saveToLocalStorage(store.getState()))

ReactDOM.render(
    <Provider store = {store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>,
     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
