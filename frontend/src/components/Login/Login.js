import { Typography, InputLabel, Button, Input, Paper } from '@mui/material';
import './Login.css';

function Login({currentUser, setCurrentUser}){

    function login(username,password){
        const data = {
            username,
            password
        }
        const options = {
            method:"PUT",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded' //USE THIS FOR POST REQUESTS
            },
            body:JSON.stringify(data)
        }
        fetch('/login',options)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            const user = data[0];
            if(!user){
                document.getElementById('loginOutput').innerHTML = `Username or Password Incorrect`;
                return;
            }
            return user.name;
        })
        .then((user)=>{
          setCurrentUser(user);
        }) 
    }

    function addUser(username,pass){
        const id=4;
        const name=username;
        const password = pass;
        const data = {id,name,password};
        let url='/adduser';
        const options = {
            method:"POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded' //USE THIS FOR POST REQUESTS
            },
            body: JSON.stringify(data)
        }
        fetch(url,options);
    }

    return(
        <div id="loginDiv">
            <div id="loginScreen">
                <div id="addUser">
                    <Typography variant="h4" sx={{mb:"40px"}}>Add New User</Typography>
                    <InputLabel htmlFor="userName">User Name</InputLabel>
                    <Input type="text" id="userName"></Input>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input type="text" id="password"></Input>
                    <Button onClick={()=>{addUser(document.getElementById('userName').value,document.getElementById('password').value)}}>Create</Button>
                </div>
                <div id="login">
                    <Typography variant="h4" sx={{mb:"40px"}}>Login</Typography>
                    <InputLabel htmlFor="userNameLogin">User Name</InputLabel>
                    <Input type="text" id="userNameLogin"></Input>
                    <InputLabel htmlFor="passwordLogin">Password</InputLabel>
                    <Input type="text" id="passwordLogin"></Input>
                    <Button onClick={()=>{login(document.getElementById('userNameLogin').value,document.getElementById('passwordLogin').value)}}>Login</Button>
                </div>
            </div>
            
        </div>

    )
}
export default Login;