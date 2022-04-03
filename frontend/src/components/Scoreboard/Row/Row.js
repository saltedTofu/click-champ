
import { Typography, InputLabel, Button, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';


function Row({user, topUsers}){

    const [rankEmoji,setRankEmoji] = useState('');

    useEffect(()=>{
        const emojis = ['👑','🥈','🥉'];
        if(user.user === topUsers[0].user){
            setRankEmoji(emojis[0]);
        }
        else if(user.user === topUsers[1].user){
            setRankEmoji(emojis[1]);
        }
        else if(user.user === topUsers[2].user){
            setRankEmoji(emojis[2]);
        }
    },[])
    return(
        <div className="scoreboardPlayer">
            <Typography variant="h4" className="scoreboardUser">{user.user + rankEmoji}</Typography>
            <Typography variant="h4" className="scoreboardScore">{user.score}</Typography>
        </div>
    )
}

export default Row;