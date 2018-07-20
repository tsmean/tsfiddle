import * as express from 'express';
import { resolve } from 'url';
const fs = require('fs-extra');
const uuidv1 = require('uuid/v1');
const app = express();
const GENERATED_FILES_DIRECTORY = 'generated';

app.get('/', async function (req, res) {
  try {
    const uuid = uuidv1();
    await fs.outputFile(`${GENERATED_FILES_DIRECTORY}/${uuid}.ts`, 'hello!');
    res.send({hello: 'world'});
  } catch (err) {
    res.status(500).send(err);
  }
  
});
app.listen(5638);
console.log('listening for incoming traffic...');
