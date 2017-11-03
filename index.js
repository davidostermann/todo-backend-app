const express = require('express')
const app = express()

app.get('/', (req, res) => {
  return res.send('coucou')
})

const port = process.env.PORT || 3000

app.listen(port, (err) => {
  if(err) {
    return err;
  }
  console.log('server listen on ', port);
  
})