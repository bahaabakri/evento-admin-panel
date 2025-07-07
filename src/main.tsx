import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import '@mantine/core/styles.css';
import App from './App.tsx'
import {MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme/theme.ts';
// import { ThemeVariables } from './theme/ThemeVariables.tsx';
// import { ThemeVariables } from './theme/ThemeVariables.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider
      theme={theme}
      defaultColorScheme="light" // ✅ New correct way
    >
      {/* <ThemeVariables/> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
)
