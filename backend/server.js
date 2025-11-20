const express = require('express');
const app = express();
const PORT = 3035;
const routes = require('./router')

app.use('/', routes);

// app.get('/',(req,res) => {
//     res.send("helo");
// });

app.listen(PORT,'0.0.0.0',() => {
    console.log(`Sever on ${PORT}`)
});