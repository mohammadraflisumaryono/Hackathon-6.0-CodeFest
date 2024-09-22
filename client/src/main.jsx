import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApplicationLoanProvider } from './context/ApplicationLoanContext.jsx'

createRoot(document.getElementById('root')).render(
  <ApplicationLoanProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ApplicationLoanProvider>,
)
