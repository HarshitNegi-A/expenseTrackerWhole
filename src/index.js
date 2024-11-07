import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginProvider from './store/LoginProvider';
import { Provider } from 'react-redux';
import store from './store/redux-store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <LoginProvider>
    <App />
    </LoginProvider>
    </Provider>
);
