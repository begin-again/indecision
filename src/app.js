/* eslint-env commonjs, browser */

import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';

ReactDOM.render(<IndecisionApp options={['Do Nothing']} />, document.getElementById('app'));
