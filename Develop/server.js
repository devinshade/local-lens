const express = require('express');
const sequelize = require('sequelize');


const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json())


app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
});