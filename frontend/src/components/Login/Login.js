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
            if(data==='user does not exist'){
                document.getElementById('loginStatus').innerHTML = `User Not Found`;
                return;
            }
            else if(data==='invalid login credentials'){
                document.getElementById('loginStatus').innerHTML = `Username or Password Incorrect`;
                return;
            }
            else{
                document.getElementById('loginStatus').innerHTML = `Login Successful!`;
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
        fetch(url,options)
        .then((response)=>{
           return response.json();
        })
        .then((data)=>{
            if(data==='Username taken'){
                document.getElementById('newUserOutput').innerHTML='Username Already Taken';
            }
            else if(data==='User added'){
                document.getElementById('newUserOutput').innerHTML='Account Created!';
            }
        })
    }

    return(
        <div id="loginDiv">
            <div id="loginScreen">
            <div id="login">
                    <Typography variant="h4" sx={{mb:"40px"}}>Login</Typography>
                    <InputLabel htmlFor="userNameLogin">User Name</InputLabel>
                    <Input type="text" id="userNameLogin"></Input>
                    <InputLabel htmlFor="passwordLogin">Password</InputLabel>
                    <Input type="password" id="passwordLogin"></Input>
                    <Button onClick={()=>{login(document.getElementById('userNameLogin').value,document.getElementById('passwordLogin').value)}}>Login</Button>
                    <Typography id="loginStatus" variant="h6"></Typography>
                </div>
                <div id="addUser">
                    <Typography variant="h4" sx={{mb:"40px"}}>Add New User</Typography>
                    <InputLabel htmlFor="userName">User Name</InputLabel>
                    <Input type="text" id="userName"></Input>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input type="password" id="password"></Input>
                    <Button onClick={()=>{addUser(document.getElementById('userName').value,document.getElementById('password').value)}}>Create</Button>
                    <Typography id="newUserOutput" variant="h6"></Typography>
                </div>
            </div>
        </div>
    )
}
export default Login;