import React from 'react'
import { render } from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
/** Setup Redux */
import { Provider } from 'react-redux'
import { store } from './redux/configStore'
/** Css ReactSlick */
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { DOMAIN } from './utils/setting'


// Thí code connect to serrver for realtime ticketbooking function 
// export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)