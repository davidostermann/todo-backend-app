const express = require('express')

const app = express()

const initOptions = {
  connect(client, dc, isFresh) {
    const cp = client.connectionParameters;
    console.log('Connected to datbase:', cp.database);
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

//console.log('process.env.DATABASE_URL : ', process.env.DATABASE_URL);
const db = pgp(process.env.DATABASE_URL || 'postgres://postgres:changeme@localhost:5432/tododb');

app.use(express.json())

// db.connect()
//   .then(function (obj) {
//     obj.done(); // success, release connection;
//   })
//   .catch(function (error) {
//     console.log("ERROR:", error.message);
//   });

app.get('/', (req, res) => {
  return res.send('coucou')
})

app.get('/todos', (req, res) => {
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
  console.log('req.body : ', req.body);

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