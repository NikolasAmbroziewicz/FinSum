import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactQueryWrapper from './api/ReactQueryWrapper';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactQueryWrapper>
        <App />
      </ReactQueryWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
