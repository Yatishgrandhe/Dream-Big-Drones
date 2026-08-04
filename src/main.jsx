import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConvexReactClient } from 'convex/react'
import { ConvexAuthProvider } from '@convex-dev/auth/react'
import './index.css'
import App from './App.jsx'
import AdminApp from './AdminApp.jsx'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)
const adminPath = import.meta.env.VITE_ADMIN_PATH
const isAdminPath = adminPath && (window.location.pathname === adminPath || window.location.pathname === `${adminPath}/setup`)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      {isAdminPath ? <AdminApp setupMode={window.location.pathname.endsWith('/setup')} /> : <App />}
    </ConvexAuthProvider>
  </StrictMode>,
)
