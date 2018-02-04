// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var containerEl: ?Element = document.getElementById('root');

if (containerEl) {
    ReactDOM.render(
        <App />,
        containerEl
    );

    registerServiceWorker();
}
