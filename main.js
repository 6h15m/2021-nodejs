const express = require('express')
const app = express()

// route, routing
// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', function (req, res){
    return res.send('/');
});

app.get('/page', function (req, res){
    return res.send('/page');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});