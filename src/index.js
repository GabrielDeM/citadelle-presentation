import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import store from './global/store';
import Global from './global';

const Root = () => (
  <Provider store={store}>
    <Global />
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'));
