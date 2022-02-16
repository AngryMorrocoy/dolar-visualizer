import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const Header: FunctionComponent<any> = (): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            m: 'auto',
          }}
        >
          DOLAR EN VENEZUELA 💸
        </Typography>
      </AppBar>
    </Box>
  );
};

export default Header;
