const express = require('express');
const cors = require('cors');

const generateBars = require('./bars');

const app = express();
app.use(cors());

app.get('/bars', async (req, res) => {
  res.send(generateBars());
});

app.listen(3001, () => console.log(`Listening on port 3001!`));
