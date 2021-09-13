import React from 'react'
import { render } from 'react-dom'
import App from './App'
/** Setup Redux */
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { store } from './redux/configStore'

const store = createStore(rooReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)