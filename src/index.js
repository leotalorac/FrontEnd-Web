import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebaseConfig from './firebase-config'
import {BrowserRouter} from "react-router-dom";
import $ from "jquery"

import {
  FirebaseAppProvider
} from 'reactfire'

let swReg;
ReactDOM.render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={'Conectando la aplicación'}>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </Suspense>
    </FirebaseAppProvider>,
  document.getElementById('root')
);

// window.addEventListener("load",() => {
//   navigator.serviceWorker.register( "./serviceWorker.js" ).then((reg) => {
//     console.log("registrado");
//       swReg=reg;
//       swReg.pushManager.getSubscription()
//   });
// });

