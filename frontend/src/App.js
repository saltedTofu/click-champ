import {useState} from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import Scoreboard from './components/Scoreboard/Scoreboard';
import Login from './components/Login/Login';
import Clicker from './components/Clicker/Clicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography} from '@mui/material';

function App() {

  const [currentUser,setCurrentUser] = useState('');
  const [deposit, setDeposit] = useState(true);

  const theme = createTheme();
  theme.typography.h1 = {
    fontSize: '6.5em',
    '@media (max-width:931px) and (min-width:788px)': {
      fontSize: '5.5em',
    },
    '@media (max-width:787px) and (min-width:646px)': {
      fontSize: '4.5em',
    },
    '@media (max-width:645px) and (min-width:501px)': {
      fontSize: '3.5em',
    },
    '@media (max-width:500px)': {
      fontSize: '2.5em',
    }
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Typography variant="h1">😤 Click Champ 😤</Typography>
        <Scoreboard 
          deposit={deposit}
        />
        <Clicker 
          currentUser={currentUser}
          deposit={deposit}
          setDeposit={setDeposit}
        />
          <Login 
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;