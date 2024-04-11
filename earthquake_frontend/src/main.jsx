import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd'
import { globalTheme } from './globalTheme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider theme={globalTheme}>
    <App />
  </ConfigProvider>
  ,
)
