const express = require('express');
const app = express();
const PORT = 3035;
const path = require("path");  
const hbs = require("hbs"); 
const routes = require('./router')



// View engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Register partials
hbs.registerPartials(path.join(__dirname, "views/partials"));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use('/', routes);

// app.get('/',(req,res) => {
//     res.send("helo");
// });

app.listen(PORT,'0.0.0.0',() => {
    console.log(`Server on ${PORT}`)
});