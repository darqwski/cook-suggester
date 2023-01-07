import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// eslint-disable-next-line no-undef

global.M = require('materialize-css');

ReactDOM.render(<App />, document.getElementById('react-app'));