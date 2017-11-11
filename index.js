
// init PostgreSQL DB

const initOptions = {
  connect(client, dc, isFresh) {
    // A connection-related success;
    console.log('Connected to datbase:', client.connectionParameters.database);
  },
  error(error, e) {
    if (e.cn) {
      // A connection-related error;
      console.log("CN:", e.cn);
      console.log("EVENT:", error.message);
    }
  }
};

const pgp = require('pg-promise')(initOptions);
const db = pgp(process.env.DATABASE_URL || 'postgres://postgres:changeme@localhost:5432/tododb');

db.connect()
  .then(function (obj) {
    obj.done(); // success, release connection;
  })
  .catch(function (error) {
    console.log("ERROR:", error.message);
  });

//init express

const express = require('express')
const app = express()
app.use(express.json())

// routes management

app.get('/', (req, res) => {
  return res.send('coucou')
})

app.get('/todos', async (req, res) => {
  try {
    const todos = await db.any('SELECT * FROM todos');
    return res.send('TODOS : ' + JSON.stringify(todos))
  }
  catch (e) {
    return res.send( JSON.stringify(e) )
  }
  // db.any('SELECT * FROM todos').then( data => {
  //   return res.send('TODOS : ' + JSON.stringify(data))
  // })
  // .catch( e => res.send( JSON.stringify(e) ) )
})

app.post('/todo', (req, res) => {
  db.none('INSERT INTO todos(name) VALUES($1)', [req.body.name])
    .then(data => {
      return res.send('INSERTED : ' + data)
    })
    .catch(error => {
      return res.send('ERROR : ' + error)
    });
})

const port = process.env.PORT || 3000

app.listen(port, (err) => {
  if(err) {
    return err;
  }
  console.log('server listen on ', port);
  
})