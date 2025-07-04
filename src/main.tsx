import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { createTheme, MantineProvider } from '@mantine/core'
import { ThemeVariables } from './theme/ThemeVariables.tsx'
export const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  },
  colors: {
    gray: [
      '#f8f9fa', // 0
      '#f1f3f5', // 1
      '#e9ecef', // 2
      '#dee2e6', // 3
      '#ced4da', // 4
      '#adb5bd', // 5
      '#868e96', // 6
      '#495057', // 7
      '#343a40', // 8
      '#212529', // 9
    ],
    dark: [
      '#c1c2c5', // 0
      '#a6a7ab', // 1
      '#909296', // 2
      '#5c5f66', // 3
      '#373a40', // 4
      '#2c2e33', // 5
      '#25262b', // 6
      '#1a1b1e', // 7
      '#141517', // 8
      '#101113', // 9
    ],
    cyan: [
      '#e3fafc',
      '#c5f6fa',
      '#99e9f2',
      '#66d9e8',
      '#3bc9db',
      '#22b8cf',
      '#15aabf',
      '#1098ad',
      '#0c8599',
      '#0b7285',
    ],
  },
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider
      theme={theme}
      defaultColorScheme="light" // ✅ New correct way
    >
      <ThemeVariables/>
      <App />
    </MantineProvider>
  </StrictMode>,
)
