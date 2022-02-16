import { ThemeOptions } from '@mui/material/';

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: ['Oxygen', 'sans-serif'].join(','),
    fontSize: 14,
  },
  palette: {
    // mode: 'dark',
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

export { themeOptions };
