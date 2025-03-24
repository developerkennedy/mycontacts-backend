const express = require('express') ;
const routes = require("./routes/routes.js");
require('express-async-errors');
const app = express();
app.use(express.json());

app.use(routes);
app.use((err,req,res) => {
    console.log(err);
    res.sendStatus(500);
});



app.listen(5000,() => console.log("Server is running on port 5000..."));
module.exports =  app;



