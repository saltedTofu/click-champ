require("dotenv").config();
const CryptoJS = require("crypto-js");
const Pool = require('pg').Pool

const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT,
}

const proConfig = {
  connectionString: process.env.DATABASE_URL, //comes from heroku addon
  ssl: { rejectUnauthorized: false }
}

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig); //uses proper config if in production or development

//GET all users
const getUsers = (request, response) => {
  pool.query('SELECT * FROM userList ORDER BY score DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.send(results.rows);
  })
}

const login = (request, response) => {
  const body = JSON.parse(Object.keys(request.body)[0]);
  const username=body.username;
  let password = body.password;

  //retrieve salt
  pool.query('SELECT * FROM userList WHERE name = $1', [username], (error, results) => {
    if (error) {
      throw error
    }
    if(!results.rows[0]){
      return response.status(404).json('user does not exist');
    }
    let salt = results.rows[0].salt;
    let hash = CryptoJS.SHA256(password+salt);
    password = hash.toString(CryptoJS.enc.Base64);
    console.log(password + ' andddd' + results.rows[0].password);
    if(password !== results.rows[0].password){
      response.status(200).json('invalid login credentials');
    }
    else{
      response.status(200).json(results.rows);
    }
  })
}

//POST new user
const createUser = (request, response) => {
  const body = JSON.parse(Object.keys(request.body)[0]);
  const id=body.id;
  const name=body.name;
  let password = body.password;
  //create salt
  var salt = CryptoJS.lib.WordArray.random(128 / 8);
  salt=salt.toString(CryptoJS.enc.Base64);

  //hash password + salt
  let hash = CryptoJS.SHA256(password+salt);
  password = hash.toString(CryptoJS.enc.Base64);

  pool.query(`SELECT * FROM userList WHERE name = $1`, [name], (error,results) => { //Check if username is taken
    if (error){
      throw error
    }
    else if(results.rows[0] === undefined){
      console.log('new user')
      pool.query(`INSERT INTO userList (name,password,salt) VALUES ($1, $2, $3)`,[name,password,salt], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).json(`User added`);
      })
    }
    else{
      response.status(404).json('Username taken');
    }
  })
  
}

const incrementClick = (request,response) => {
  const body = JSON.parse(Object.keys(request.body)[0]);
  const username = body.currentUser;
  const clicksToAdd = body.clicks;
  pool.query(
    'UPDATE userlist SET score = score+$1 WHERE name=$2', 
    [clicksToAdd,username],
    (error,results) => {
      if(error){
        throw error
      }
      response.status(201).send('score incremented');
    }
  )
}

const db = async (req,res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM userlist');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
}
module.exports = {
    getUsers,
    login,
    createUser,
    incrementClick,
    db
  }