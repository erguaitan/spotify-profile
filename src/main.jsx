import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { obtainAuthCode, redirectToAuthCodeFlow, obtainNewToken } from './lib/auth.js';
import { obtainCookie } from './lib/cookie.js';

const clientId = import.meta.env.VITE_CLIENT_ID;
const code = obtainAuthCode();

if (!code) {
  redirectToAuthCodeFlow(clientId);
} else {
  // let accessToken = localStorage.getItem("access_token")
  const accessToken = await obtainNewToken(clientId, code);
  localStorage.clear()
  const params = new URLSearchParams(window.location.search);
  params.delete("code");
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, "", newUrl);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
