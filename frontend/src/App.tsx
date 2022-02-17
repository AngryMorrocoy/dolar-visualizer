import { createTheme, ThemeProvider } from '@mui/material';
// import Container from '@mui/material/Container';
import { themeOptions } from './muiTheme';
import Header from './components/Header';
import DolarChart from './components/DolarChart';

const theme = createTheme(themeOptions);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <DolarChart />
      </div>
    </ThemeProvider>
  );
};

export default App;
