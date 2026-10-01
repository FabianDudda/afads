import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@my-ds/tokens/tokens.css'
import '@my-ds/components/dist/bundle.css'
// Side-effect import: registers <ds-button> and friends.
import '@my-ds/components'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
