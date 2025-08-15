import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting React app...');

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

const root = ReactDOM.createRoot(rootElement);
console.log('Root created successfully');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('App rendered');