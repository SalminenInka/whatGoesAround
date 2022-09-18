const express = require('express');
const router = express.Router();
const app = express();
const { Client } = require('pg');
app.use("/", router);
app.use(express.json()); 

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});
client.connect();

/*
client.query('SELECT * FROM log', (err, res) => {
  if(!err) {
    console.log(res.rows);
  } else {
    console.log(err.message);
  }
  client.end;
});
*/

router.get('/:echo', async (req, res) => {
  try {
    const echos = req.params.echo;
    client.query('INSERT INTO log (echo_log) VALUES ($1)', [echos]);
    res.json(echos);
  } catch (err) {
    res.status(500).json('Failed to retrieve logs.');
  }
});

app.listen(process.env.PORT);