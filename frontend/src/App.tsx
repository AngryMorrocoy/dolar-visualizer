import { createTheme, TextField, ThemeProvider } from '@mui/material';
// import Container from '@mui/material/Container';
import { themeOptions } from './muiTheme';
import DolarChart from './components/DolarChart/DolarChart';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import dayjs from 'dayjs';

const theme = createTheme(themeOptions);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Hero />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh',
        }}
      >
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            onChange={(date) => console.log(date)}
            label="Date"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <DolarChart />
      </div>
    </ThemeProvider>
  );
};

export default App;
