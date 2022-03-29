import {useState} from 'react';
import './App.css';

function App() {

  const [currentUser,setCurrentUser] = useState('');

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
function showUsers(){
  const options = {
      method:"GET"
  }
  fetch('/users',options)
  .then((response)=>{
      return response.json();
  })
  .then((data)=>{
      let node = document.getElementById('highScores');
      node.innerHTML='';
      let table = document.createElement('table');
      let newHeader = table.createTHead();
      let header = newHeader.insertRow(0);
      let userHead = header.insertCell(0);
      let scoreHead = header.insertCell(1);
      userHead.innerHTML = 'User';
      scoreHead.innerHTML = 'Score';
      for(const user in data){
          let newRow = table.insertRow(-1);
          let userCell = newRow.insertCell(0);
          let scoreCell = newRow.insertCell(1);
          userCell.innerHTML = data[user].name;
          scoreCell.innerHTML = data[user].score;
      }
      node.appendChild(table);
  })
}
function changePassword(username,oldPassword,newPassword){
  console.log(username,oldPassword,newPassword);
  const data = {
      username,
      oldPassword,
      newPassword
  }
  const options = {
      method:"PUT",
      headers:{
          'Content-Type': 'application/x-www-form-urlencoded' //USE THIS FOR POST REQUESTS
      },
      body:JSON.stringify(data)
  }
  fetch(`/updateuser`,options);
}
function login(username,password){
  console.log('logging in');
  console.log(username,password);
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
      console.log(data);
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
function incrementClick(){ 
  if(currentUser){
      console.log(currentUser);
      const data = {
          currentUser
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
        showUsers();
      })
  }
}
  return (
    <div className="App">
      <h1>Add New User</h1>
      <label htmlFor="userName">User Name</label>
      <input type="text" id="userName"></input>
      <label htmlFor="password">Password</label>
      <input type="text" id="password"></input>
      <button onClick={()=>{addUser(document.getElementById('userName').value,document.getElementById('password').value)}}>Create</button>
      <script src="script.js"></script>
      <h1>See all Users</h1>
      <button onClick={()=>{showUsers()}}>Show</button>
      <div id="highScores">
      </div>
      <div id="userOutput">
      </div>
      <div id="scoreOutput">
      </div>
      <div>
          <h1>Change Password</h1>
          <label htmlFor="userNameCP">User Name</label>
          <input type="text" id="userNameCP"></input>
          <label htmlFor="oldPasswordCP">Password</label>
          <input type="text" id="oldPasswordCP"></input>
          <label htmlFor="newPasswordCP">New Password</label>
          <input type="text" id="newPasswordCP"></input>
          <button onClick={()=>{changePassword(document.getElementById('userNameCP').value,document.getElementById('oldPasswordCP').value,document.getElementById('newPasswordCP').value)}}>Submit</button>
      </div>
      <div>
          <h1>Login</h1>
          <label htmlFor="userNameLogin">User Name</label>
          <input type="text" id="userNameLogin"></input>
          <label htmlFor="passwordLogin">Password</label>
          <input type="text" id="passwordLogin"></input>
       
          <button onClick={()=>{login(document.getElementById('userNameLogin').value,document.getElementById('passwordLogin').value)}}>Login</button>
      </div>
      <div>
          <h2 id="loginOutput">Current User: {currentUser}</h2>
      </div>
      <div>
          <button onClick={()=>{incrementClick()}}>Click</button>
          <h2 id="currentScore"></h2>
        </div>
    </div>
  );
}

export default App;