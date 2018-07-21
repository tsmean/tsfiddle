import * as express from 'express';
import { resolve } from 'url';
import {exec} from 'child_process';
const fs = require('fs-extra');
const uuidv1 = require('uuid/v1');
const GENERATED_FILES_DIRECTORY = 'generated';
const util = require('util');
const execPromise = util.promisify(exec);
var cors = require('cors');
var bodyParser = require('body-parser');
import * as browserify from 'browserify';

const app = express();
app.use(cors());
app.use(bodyParser.json());

enum STATUS_CODES {
  BAD_REQUEST = 400
}

function doBrowserify(jsFile) {
  const b = browserify();
  b.add(jsFile);
  const readableStream = b.bundle()
  readableStream.setEncoding('utf8');
  const bundle = readableStream.read();
  return bundle;
}

async function doBrowserify2(jsFile, outFile) {
  await execPromise(`browserify ${jsFile} -o ${outFile}`);
}

app.use('/', express.static('ng-dist/tsfiddle-frontend'));

app.post('/api/compile', async function (req: any, res) {
  try {
    const input = req.body.input;
    const uuid = uuidv1();
    const fileWithoutExtesion = `${GENERATED_FILES_DIRECTORY}/${uuid}`
    const tsFile = fileWithoutExtesion + '.ts';
    const jsFile = fileWithoutExtesion + '.js';
    const bundle = fileWithoutExtesion + 'bundle.js';
    await fs.outputFile(tsFile, input);
    try {
      await execPromise(`tsc --lib es5,es2015,dom ${tsFile}`);
    } catch (err) {
      res.send({
        compilationError: err
      });
    }
    await doBrowserify2(jsFile, bundle);
    const js = await fs.readFile(bundle, 'utf8');
    res.send({compiledJS: js});
  } catch (err) {
    res.status(500).send(err);
  }
});
const port = 5638
app.listen(port);
console.log(`listening on port ${port}`);
