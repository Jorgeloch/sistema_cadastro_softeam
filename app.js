const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
dotenv.config();

const database = process.env.MONGO_URI; 
mongoose.connect(database);
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

app.use('/',  require('./routes/index'))
app.use('/project', require('./routes/projectRoutes'));
app.use('/collaborator', require('./routes/collaboratorRoutes'));
app.use('/company', require('./routes/companiesRoutes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(3000, () => console.log("Running server"));

module.exports = app;