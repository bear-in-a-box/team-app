import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const root = (
  <p>Hi!</p>
);

ReactDOM.render(root, document.getElementById('root'));

serviceWorker.unregister();
