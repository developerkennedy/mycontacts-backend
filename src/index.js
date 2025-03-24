const express = require('express') ;
const routes = require("./routes/routes.js");
const errorHandler = require("./middleware/errorHandler.js");
const cors = require("./middleware/cors.js");
require('express-async-errors');
const app = express();
app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(5000,() => console.log("Server is running on port 5000..."));
module.exports =  app;



