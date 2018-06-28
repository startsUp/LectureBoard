import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
 var ws = new WebSocket('ws://localhost:40510');

    ws.onopen = function () {
        console.log('websocket is connected ...')
        ws.send('connected')
    }

    ws.onmessage = function (ev) {
        console.log(ev);
    }