require('newrelic');
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3003;
app.use(express.static(path.join(__dirname, '../public')));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/restaurants/:id/photos', (req, res) => {
  const { id } = req.params;
  axios.get(`http://localhost:3000/api/restaurants/${id}/photos`)
  .then(response => {
    res.status(200).send(response.data);
  })
  .catch(error => {
    res.status(500).send();
  });
})

// app.get('/api/restaurants/:id/reviews', (req, res) => {
//   const { id } = req.params;
//   res.redirect(`http://localhost:3001/api/restaurants/${id}/reviews`);
// })

// app.get('/api/restaurants/:id/info', (req, res) => {
//   const { id } = req.params;
//   res.redirect(`http://3.16.165.5:3002/api/restaurants/${id}/info`);
// })

// app.get('/api/restaurants/:id/googlereviews', (req, res) => {
//   const { id } = req.params;
//   res.redirect(`http://localhost:3003/api/restaurants/${id}/googlereviews`);
// })

app.listen(port, console.log('proxy server listening on port', port));
