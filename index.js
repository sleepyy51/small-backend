const express = require('express');
const app = express();
const port = 8080;

app.get('/hello_world', (req, res) => {
    res.json({message : 'Hello world'});
});

app.get('/status', (req, res) => {
    res.json({status : 'running'});
});

app.listen(port, () => console.log(`Running http://localhost:${port}`))