const express = require('express') ;
const routes = require("./routes/routes.js");
require('express-async-errors');
const app = express();
app.use(express.json());

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
   next()
})
app.use(routes);
app.use((err,req,res) => {
    console.log(err);
    res.sendStatus(500);
});



app.listen(5000,() => console.log("Server is running on port 5000..."));
module.exports =  app;



