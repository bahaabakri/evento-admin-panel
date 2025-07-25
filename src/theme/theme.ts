import { createTheme } from "@mantine/core";
export const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'roseRed',
  spacing: {
    xxxs: '2px',
    xxs: '4px',
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
    full: '50%'
  },
  fontSizes: {
    xxxs: '4px',
    xxs: '8px',
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  },
  colors: {
    roseRed: [
      '#fbe7ed', // 0 - very light tint
      '#f6c2d1', // 1 - lighter tint
      '#f09cb4', // 2 - light tint
      '#ea7597', // 3 - soft tint
      '#e44f7a', // 4 - medium tint
      '#c21e56', // 5 - base color
      '#a31a4a', // 6 - medium shade
      '#85153d', // 7 - dark shade
      '#661131', // 8 - darker shade
      '#470c24', // 9 - very dark
    ],
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
    success: [
      '#ebfbee', // 0 - very light green
      '#d3f9d8', // 1
      '#b2f2bb', // 2
      '#8ce99a', // 3
      '#69db7c', // 4
      '#51cf66', // 5 - base success green
      '#40c057', // 6
      '#37b24d', // 7
      '#2f9e44', // 8
      '#2b8a3e', // 9 - darkest green
    ],
    error: [
      '#fff5f5', // 0 - very light red
      '#ffe3e3', // 1
      '#ffc9c9', // 2
      '#ffa8a8', // 3
      '#ff8787', // 4
      '#ff6b6b', // 5 - base error red
      '#fa5252', // 6
      '#f03e3e', // 7
      '#e03131', // 8
      '#c92a2a', // 9 - darkest red
    ],
  },
});