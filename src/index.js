import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';

import './index.css';

import App from './App';
import { ContextProvider } from './contexts/ContextProvider';


ReactDOM.render(
//   <React.StrictMode>
    <ContextProvider>
      <CookiesProvider>
      <App />
      </CookiesProvider>
     </ContextProvider>,
//   </React.StrictMode>,
  document.getElementById('root'),
);