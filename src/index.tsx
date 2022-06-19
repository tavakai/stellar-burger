import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from './services/store/index';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename="/stellar-burger">
    <Provider store={store}>
      <App />
    </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
