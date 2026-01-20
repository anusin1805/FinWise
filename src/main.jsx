import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx' // Make sure this matches the new name
import './style.css';    // This imports your styles

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
