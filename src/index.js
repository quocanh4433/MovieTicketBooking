import React from 'react'
import { render } from 'react-dom'
import { DOMAIN } from './utils/setting'
/** Setup Redux */
import { Provider } from 'react-redux'
import { store } from './redux/configStore'
/** Css ReactSlick */
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import App from './App'
import 'antd/dist/antd.css'

/** Setup SignalR */
import * as signalR from '@aspnet/signalr'

// This code connect to server for realtime ticketbooking function 
export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();

// conecttion.start lắng nghe tín hiệu từ server. Do là hàm bất đồng bộ nên phải đảm bảo mọi giao thức kết nối đã xác nhận thì mới render ra giao diện
connection.start().then(() => { 
  render(
    <Provider store={store}>
      <App />
    </Provider>
    ,
    document.getElementById('root')
  );
}).catch(errors => {
  console.log("Error: ", errors);
})
