const express = require('express')
const app = express()

const listenPort = 9001;

console.log(__dirname);

app.use(express.static(__dirname + '/static'))

app.listen(listenPort, () => console.log('listening on port:', listenPort))

app.get('/', (req, res) => res.send('Hello World!'))
