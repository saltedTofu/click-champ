import {useState} from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import Scoreboard from './components/Scoreboard/Scoreboard';
import Login from './components/Login/Login';
import Clicker from './components/Clicker/Clicker';
import { Typography} from '@mui/material';

function App() {

  const [currentUser,setCurrentUser] = useState('');
  const [clicks, setClicks] = useState(0);
  const [deposit, setDeposit] = useState(true);

  return (
    <div className="App">
      <Typography variant="h1">😤 Click Champ 😤</Typography>
      <Scoreboard 
        currentUser={currentUser}
        clicks={clicks}
        deposit={deposit}
        setDeposit={setDeposit}
      />
      <Clicker 
        currentUser={currentUser}
        clicks={clicks}
        setClicks = {setClicks}
        deposit={deposit}
        setDeposit={setDeposit}
      />
        <Login 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}

export default App;