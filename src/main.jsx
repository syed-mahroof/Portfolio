import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/themes.css'   // multi-theme engine (fonts + [data-theme] tokens) — must load first
import './index.css'           // structural / layout system

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
