import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './Redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render((
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>
), document.getElementById('root'));
