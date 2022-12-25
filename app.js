const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config-data/config')

const app = express();

//connection with mongoDB string -> mongodb+srv://user_db:njB6sH0zRaRI291Q@clustersofteam.iqsjr3x.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(config.DBConnectionString);
mongoose.set('strictQuery', true);

mongoose.connection.on('error', (err) => {
    console.log(`Error trying to connect with database: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('This aplication has been disconnected from the database!')
})

mongoose.connection.on('connected', () => console.log('Application has been connected to database'))

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./routes/index');
const collaboratorRoute = require('./routes/collaboratorRoutes');
const companiesRoute = require('./routes/companiesRoutes');
const projectRoute = require('./routes/projectRoutes');

app.use('/', indexRoute)
app.use('/project', projectRoute);
app.use('/collaborator', collaboratorRoute);
app.use('/company', companiesRoute);


app.listen(3000, () => console.log("Running server"));

module.exports = app;