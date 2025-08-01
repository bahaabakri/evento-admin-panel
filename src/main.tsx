import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import 'leaflet/dist/leaflet.css';
import App from './App'
import {MantineProvider } from '@mantine/core'
import { theme } from './theme/theme';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
// import { ThemeVariables } from './theme/ThemeVariables.tsx';
// import { ThemeVariables } from './theme/ThemeVariables.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider
      theme={theme}
      defaultColorScheme="light" // ✅ New correct way
    >
      <ModalsProvider>
          <Notifications position="top-right" zIndex={2077} />
          <App />
      </ModalsProvider>
      {/* <ThemeVariables/> */}
    </MantineProvider>
  </StrictMode>
)
