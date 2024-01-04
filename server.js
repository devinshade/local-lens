const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session');


const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.get('/health', (req, res) => {
  res.json({status: 'healthy'})
})

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});