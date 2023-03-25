const express = require('express');

const routerUsers = require('./routes/users.routes') 
const routerRepair = require('./routes/repairs.routes')

const app = express();

app.use(express.json());

app.use("/api/v1/users", routerUsers);
app.use("/api/v1/repairs", routerRepair);

module.exports = app;