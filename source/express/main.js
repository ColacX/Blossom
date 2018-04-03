const fs = require('fs-extra');
const md5 = require('md5');
const bodyParser = require("body-parser");
const express = require('express');
const app = express();


const listenPort = 9001;

console.log(__dirname);

app.use(express.static(__dirname + '/static'));

app.use('/data', express.static(__dirname + '/data'));

app.listen(listenPort, () => console.log('listening on port:', listenPort))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/classify/predict', bodyParser.raw({ type: 'image/jpeg' }), async (req, res) => {
  let data = req.body;

  try {
    await fs.outputFile(__dirname + `/data/predict.jpeg`, data);

    let spawn = require("child_process").spawn;
    let pythonProcess = spawn('python3', ['-W ignore', __dirname + '/python/classify.py', '-p'], { cwd: __dirname });

    pythonProcess.stdout.on('data', (data) => {
      //res.status(200).send(data);
      //console.log('stdout', data.toString());
      res.status(200).send(data.toString());
    });

    pythonProcess.stderr.on('data', (data) => {
      //res.status(500).send(data);
    });

    pythonProcess.on('exit', (code) => {
      if (code) {
        res.status(500).send();
      }
    });
  }
  catch (e) {
    res.status(500).send(e);
  }

});

app.post('/classify/upload/:category', bodyParser.raw({ type: 'image/jpeg' }), async (req, res) => {
  let category = req.params.category;
  let data = req.body;
  let hash = md5(data);

  try {
    await fs.outputFile(__dirname + `/data/classify/${category}/${hash}.jpeg`, data);
    res.status(200).send('success');
  }
  catch (e) {
    console.error(e);
    res.status(500).send(e);
  }

});
