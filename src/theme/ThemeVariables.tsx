// ThemeVariables.tsx
import { useMantineTheme } from '@mantine/core';
import { useEffect } from 'react';

export function ThemeVariables() {
  const theme = useMantineTheme();

  useEffect(() => {
    const root = document.documentElement;

    // Spacing
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--mantine-spacing-${key}`, value);
    });

    // Radius
    Object.entries(theme.radius).forEach(([key, value]) => {
      root.style.setProperty(`--mantine-radius-${key}`, value);
    });

    // Font sizes
    Object.entries(theme.fontSizes).forEach(([key, value]) => {
      root.style.setProperty(`--mantine-font-size-${key}`, value);
    });

    // Colors (only main color here for demo, you can expand this)
    const gray = theme.colors.gray || [];
    gray.forEach((val, i) => {
      root.style.setProperty(`--mantine-color-gray-${i}`, val);
    });

    const dark = theme.colors.dark || [];
    dark.forEach((val, i) => {
      root.style.setProperty(`--mantine-color-dark-${i}`, val);
    });

    const cyan = theme.colors.cyan || [];
    cyan.forEach((val, i) => {
      root.style.setProperty(`--mantine-color-cyan-${i}`, val);
    });

    // Body
    root.style.setProperty('--mantine-color-body', theme.white || '#fff');
  }, [theme]);

  return null;
}