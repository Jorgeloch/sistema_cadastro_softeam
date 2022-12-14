const express = require('express');
const app = express();

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