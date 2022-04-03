import {useEffect, useState} from 'react';
import { nanoid } from 'nanoid'
import { Typography, InputLabel, Button, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './Scoreboard.css';
import Row from './Row/Row';

function Scoreboard({deposit}){
    const [topUsers,setTopUsers] = useState([]);


    useEffect(()=>{
        const options = {
            method:"GET"
        }
        fetch('/users',options)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            let rowsToAdd=[];
            for(const user in data){
                rowsToAdd.push({user:data[user].name, score:data[user].score})
            }
            return rowsToAdd;
        })
        .then((rowsToAdd)=>{
            setTopUsers(rowsToAdd);
        })
    },[deposit])

    return(
        <div id="scoreboardDiv">
            <Typography variant="h2">Scoreboard</Typography>
            <div id="scoreboard">
                {topUsers.map((user) => <Row user={user} topUsers={topUsers} key={nanoid(5)}/>)}
            </div>
            <div id="highScores">
            </div>
        </div>
    )
}

export default Scoreboard;