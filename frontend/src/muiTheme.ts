import { ThemeOptions } from '@mui/material/';

export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: ['Oxygen', 'sans-serif'].join(','),
    fontSize: 14,
  },
  palette: {
    // mode: 'dark',
    background: {
      default: '#FFF7D6'
    },
    primary: {
      main: '#005B73',
    },
    secondary: {
      main: '#E69C24',
    },
    error: {
      main: '#cd1d1d',
    },
  },
};
