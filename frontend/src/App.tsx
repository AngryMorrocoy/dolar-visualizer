import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { themeOptions } from './muiTheme';
import DolarChart from './components/DolarChart/DolarChart';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import DateRangePicker from './components/DateRangePicker/DateRangePicker';

const theme = createTheme(themeOptions);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Hero />
      <DateRangePicker />
      <DolarChart />
    </ThemeProvider>
  );
};

export default App;
