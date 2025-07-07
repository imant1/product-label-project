import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { OptionsProvider } from './lib/context/options-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
		<OptionsProvider>
    	<App />
		</OptionsProvider>
  </StrictMode>,
)
