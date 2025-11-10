import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LandingPage from '../Webpages/Landing-Page.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LandingPage />
  </StrictMode>,
)
