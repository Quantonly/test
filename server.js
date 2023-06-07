const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const initPassword = 'ZZ727hqUoUGinµùig2PfDkqL2';

app.use(express.static('public'));

app.get('/protected-content', (req, res) => {
  const { password } = req.query;

  if (password === initPassword) {
    fs.readFile('public/protected-content.html', 'utf8', (err, data) => {
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
