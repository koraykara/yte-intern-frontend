import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import Form from './components/Form'   
import * as serviceWorker from './serviceWorker';

// const inputs = [{
//     name: "username",
//     placeholder: "username",
//     type: "text"
//   },{
//     name: "password",
//     placeholder: "password",
//     type: "password"
//   },{
//     type: "submit",
//     value: "Submit",
//     className: "btn"
//   }]
//   const props = {
//     name: 'loginForm',
//     method: 'POST',
//     action: '/perform_login',
//     inputs: inputs
//   }
// const params = new URLSearchParams(window.location.search)


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
