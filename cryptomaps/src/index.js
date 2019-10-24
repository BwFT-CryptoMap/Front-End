import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import Reducer from './reducers'


const store = createStore(Reducer, applyMiddleware(thunk, logger));
ReactDOM.render(
    <Provider store={store}>
        <Router><App /></Router>
    </Provider>
    , document.getElementById('root'));