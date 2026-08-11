if (import.meta.env.DEV) {
  void import('react-grab')
  void import('react-scan')
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminApp from './AdminApp.jsx'

const adminPath = import.meta.env.VITE_ADMIN_PATH
const isAdminPath = adminPath && (window.location.pathname === adminPath || window.location.pathname === `${adminPath}/setup`)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdminPath ? <AdminApp setupMode={window.location.pathname.endsWith('/setup')} /> : <App />}
  </StrictMode>,
)
