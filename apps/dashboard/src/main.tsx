import React from 'react'
import ReactDOM from 'react-dom/client'
import { DashboardApp } from './App'
import '@sms/ui/src/index.css'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DashboardApp />
  </React.StrictMode>
)
