import * as express from 'express';
import { resolve } from 'url';
import {exec} from 'child_process';
const fs = require('fs-extra');
const uuidv1 = require('uuid/v1');
const GENERATED_FILES_DIRECTORY = 'generated';
const util = require('util');
const execPromise = util.promisify(exec);
var cors = require('cors');

const app = express();
app.use(cors());

enum STATUS_CODES {
  BAD_REQUEST = 400
}

app.get('/', async function (req, res) {
  try {
    const uuid = uuidv1();
    const fileWithoutExtesion = `${GENERATED_FILES_DIRECTORY}/${uuid}`
    const tsFile = fileWithoutExtesion + '.ts';
    const jsFile = fileWithoutExtesion + '.js';
    await fs.outputFile(tsFile, 'console.log(\'hi\')');
    try {
      await execPromise(`tsc ${tsFile}`);
    } catch (err) {
      res.send({
        compilationError: err
      });
    }
    const js = await fs.readFile(jsFile, 'utf8');
    res.send({compiledJS: js});
  } catch (err) {
    res.status(500).send(err);
  }
});
const port = 5638
app.listen(port);
console.log(`listening on port ${port}`);
