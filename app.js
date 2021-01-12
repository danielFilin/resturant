const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const employeeRoutes = require('./routes/employees');
const managersRoutes = require('./routes/manager');

const errorController = require('./controllers/error');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(`mongodb+srv://filind85:${keys.mongoDB}@cluster0.cdffu.mongodb.net/restuarant?retryWrites=true&w=majority`).then(() => {
  console.log('connected to DB')
})
.catch( ()=> {
  console.log('connection failed')
})

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
app.use(errorController.get404);

module.exports = app;
