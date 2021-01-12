const express = require('express');
const bodyParser = require('body-parser');

const employeeRoutes = require('./routes/employees');
const managersRoutes = require('./routes/manager');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Custom-Header', 'Authorization', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods',
  "GET, PUT, POST, DELETE, OPTIONS, PATCH");
  next();
});

app.use(employeeRoutes);
app.use(managersRoutes);

module.exports = app;
