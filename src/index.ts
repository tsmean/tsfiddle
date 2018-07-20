import * as express from 'express';
const fs = require('fs-extra');
const uuidv1 = require('uuid/v1');
const app = express();
const GENERATED_FILES_DIRECTORY = 'generated';

app.get('/', async function (req, res) {
  try {
    const uuid = uuidv1();
    await fs.ensureDir(GENERATED_FILES_DIRECTORY)
    await fs.outputFile(`${GENERATED_FILES_DIRECTORY}/${uuid}.ts`, 'hello!');
  } catch (err) {
    // TODO: error handling
  }
  res.send({hello: 'world'})
});
app.listen(5638);
console.log('listening for incoming traffic...');
