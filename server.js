const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const initPassword = 'ZZ727hqUoUGinµùig2PfDkqL2'

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.post('/protected-content', (req, res) => {
  const { password } = req.body;

  if (password === initPassword) {
    fs.readFile('protected-content.html', 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).send(data);
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid password. Access denied.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});