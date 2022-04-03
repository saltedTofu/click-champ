const express = require('express')
const path = require('path');
const app = express();
const db = require('./queries');
const port = process.env.PORT || 5000;
const cors = require('cors');



app.use(cors({
    origin: 'http://localhost:3000' //allows access to front end fetch api during development
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV === 'production'){
  //serve static content
  app.use(express.static('./frontend/build'));
}
app.use(express.static('./frontend/build'));

app.get('/db', db.db);

app.get('/users', db.getUsers);

app.get('/',(req,res) => {
  res.sendFile('/frontend/build/index.html', {root:'.'})
})

app.post('/adduser', db.createUser);
app.put('/incrementClick',db.incrementClick);
app.put('/login', db.login);

app.get('*',(req,res)=>{
  res.sendFile('/frontend/build/index.html', {root:'.'})
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})