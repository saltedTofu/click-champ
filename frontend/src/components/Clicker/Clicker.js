import { Typography, InputLabel, Button, Input, Paper } from '@mui/material';
import './Clicker.css';
import {useState} from 'react';

function Clicker({currentUser, deposit, setDeposit}){
    const [clicks, setClicks] = useState(0);

    const depositClick = () =>{ 
        if(currentUser){
            const data = {
                currentUser,
                clicks
            }
            const options = {
                method:"PUT",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded' //USE THIS FOR POST REQUESTS
                },
                body:JSON.stringify(data)
            }
            fetch('/incrementClick',options)
            .then(()=>{
                setClicks(0);
                setDeposit(!deposit);
            })
        }
      }
    const incrementClick = () => {
        setClicks(clicks+1);
    }

    return(
        <div>
            <button id="clickButton" onClick={()=>{incrementClick()}}>Click</button>
            <button id="depositClicks" onClick={()=>{depositClick()}}>Deposit</button>
            <Typography variant="h3" id="loginOutput" sx={{mt:"10px"}}>Current User: {currentUser}</Typography>
            <Typography variant="h2">{clicks}</Typography>
        </div>
    )
}

export default Clicker;