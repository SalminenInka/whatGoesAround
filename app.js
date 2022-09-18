const express = require('express');
const router = express.Router();
const app = express();

app.use("/", router);
app.use(express.json());

const Pool = require('pg').Pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT
});

router.get('/:echo', async (req, res) => {
  try {
    await pool.
    query('INSERT INTO userdata (request) VALUES (?)', [req.params.echo]);
    res.json(req.params.echo);
  } catch (err) {
    res.status(500).json('Failed to log the data.');
  }
});

app.listen(process.env.PORT);