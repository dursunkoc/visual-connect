import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from './Store';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from './components/AlertTemplate'

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 3500,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
