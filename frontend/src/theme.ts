import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a5f',
      light: '#4f5b8f',
      dark: '#001b33',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#38b2ac',
      light: '#6ce4e0',
      dark: '#00827c',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif'
  },
  shape: {
    borderRadius: 8
  }
});