require("dotenv").config();
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
  pool.query('SELECT * FROM userList', (error, results) => {
    if (error) {
      throw error
    }
    response.send(results.rows);
  })
}

//GET user by id
const login = (request, response) => {
  const body = JSON.parse(Object.keys(request.body)[0]);
  const username=body.username;
  const password = body.password;
  pool.query('SELECT * FROM userList WHERE name = $1 AND password = $2', [username,password], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows);
    response.status(200).json(results.rows)
  })
}

//POST new user
const createUser = (request, response) => {
  const body = JSON.parse(Object.keys(request.body)[0]);
  const id=body.id;
  const name=body.name;
  const password = body.password;
  pool.query(`SELECT * FROM userList WHERE name = $1`, [name], (error,results) => { //Check if username is taken
    if (error){
      throw error
    }
    else if(results.rows[0] === undefined){
      console.log('new user')
      pool.query(`INSERT INTO userList (name,password) VALUES ($1, $2)`,[name,password], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`User added with ID: `);
      })
    }
    else{
      console.log('username taken');
      response.status(404).send('Username taken');
    }
  })
  
}

//POST update user
const updateUser = (request, response) => {
  const body = JSON.parse(Object.keys(request.body)[0]);
  console.log(body);
  const username = body.username;
  const oldPassword = body.oldPassword;
  const newPassword = body.newPassword;
  pool.query(
    'SELECT * FROM userList WHERE name = $1', [username], (error, results) => {
      if (error) {
        throw error
      }
      else if(!results.rows[0]){
        console.log('no user info found')
        response.status(404).send('Incorrect login information');
      }
      else if(results.rows[0].password == oldPassword){
        console.log('password match');
        pool.query(
          'UPDATE userlist SET password = $1 WHERE name=$2', 
          [newPassword,username],
          (error,results) => {
            if(error){
              throw error
            }
            response.status(201).send('password changed successfully');
          }
        )
      }
      else{
        response.status(404).send('Incorrect login information');
      }
    }
  )
}

//DELETE user
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM userList WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const incrementClick = (request,response) => {
  const body = JSON.parse(Object.keys(request.body)[0]);
  const username = body.currentUser;
  pool.query(
    'UPDATE userlist SET score = score+1 WHERE name=$1', 
    [username],
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
    const result = await client.query('SELECT * FROM test_table');
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
    updateUser,
    deleteUser,
    incrementClick,
    db
  }