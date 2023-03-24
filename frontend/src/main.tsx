import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import ReactQueryWrapper from './api/ReactQueryWrapper';

import { store } from 'src/store/main'
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactQueryWrapper>
        <Provider store={store}>
          <App />
        </Provider>
      </ReactQueryWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
