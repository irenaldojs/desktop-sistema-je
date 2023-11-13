import { createTheme } from '@mui/material'

export const Theme = createTheme({
  palette: {
    primary: {
      main: '#962b4b',
    },
    secondary: {
      main: '#5e6d5a',
    },
    background: {
      default: '#faa191',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#333',
      secondary: '#eee',
    },
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: '500',
  },
})

/*
--primary-color: #962b4b;
  --primary-color-hover: #6f2138;
  --secondary-color: #5e6d5a;
  --secondary-color-hover: #84967e;
  --third-color: #f05d67;
  --fourth-color: #becb7c;
  --background-color: #faa191;
  --background-color-light: #f5f5f5;
  --text-color: #333;
  --text-color-light: #eee;

*/
