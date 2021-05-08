import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

if (import.meta.env.PROD) {
  console.log = function () {};
}

console.log(import.meta.env);

ReactDOM.render(<App />, document.getElementById('root'));
