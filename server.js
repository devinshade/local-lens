const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers')
const exphbs = require('express-handlebars');
const path = require('path');
const helpers = require('./utils/helpers');

const app = express()
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes)

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});