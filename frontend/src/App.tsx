import {
  createTheme,
  CssBaseline,
  Divider,
  ThemeProvider,
} from '@mui/material';
import { themeOptions } from './muiTheme';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import BodyChart from './components/BodyChart/BodyChart';

const theme = createTheme(themeOptions);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Hero />
      <Divider sx={{ mb: 4 }} />
      <BodyChart />
    </ThemeProvider>
  );
};

export default App;
