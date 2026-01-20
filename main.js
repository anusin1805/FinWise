import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // This imports the logic you provided
import './style.css';    // This imports your styles

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
