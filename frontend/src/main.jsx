import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary'
import { AdminProvider } from './contexts/AdminContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AdminProvider>
        <App />
      </AdminProvider>
    </ErrorBoundary>
  </StrictMode>
)
