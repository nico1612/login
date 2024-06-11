import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './router/router.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from './stores/store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
      </Provider>
  </React.StrictMode>,
)
