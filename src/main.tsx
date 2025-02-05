import { Buffer } from 'buffer'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import LandingPage from './pages/LandingPage.tsx'

// @ts-ignore
window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  </React.StrictMode>,
)
