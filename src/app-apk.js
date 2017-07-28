// import './app.scss'

// import 'babel-polyfill'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn');

import React from 'react'
import ReactDOM from 'react-dom'

import Root from './containers/Root'
// import Test from './containers/Test.jsx'

// import SOCKET from './common/socketio';

// 启用websocket
// SOCKET.open();

ReactDOM.render(
  <Root />,
  document.querySelector('#rc-root')
);