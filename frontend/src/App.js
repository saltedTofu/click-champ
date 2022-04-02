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
  
  const [deposit, setDeposit] = useState(true);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;