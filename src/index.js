import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

let url = process.env.REACT_APP_SONGLISTURL;
let songlist = []
let id2namesList = {}

axios.get(url)
    .then(function (response) {
        let data = response.data.split("\n");
        for (let i=0; i<data.length;i++) {
            let [id, ...name] = data[i].split(",");
            let trackname = name.join(",");
            songlist.push({id:id, name:trackname});
            id2namesList[id] = trackname;
        }
    })

root.render(
  <React.StrictMode>
    <App songlist={songlist} id2namesList={id2namesList} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
