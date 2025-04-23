import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from "@auth0/auth0-react";
const domain = 'dev-z6tatywvih7xm0cl.us.auth0.com'
const clientId = '9rtSKvfuFgpzOnIVT0zno4grHCRTRrQW'
createRoot(document.getElementById('root')).render(
  <Auth0Provider
   domain={domain}
   clientId={clientId}
   authorizationParams={{ redirect_uri: window.location.origin }}
  >
  <StrictMode>
    <App />
  </StrictMode>,
  </Auth0Provider>
)
