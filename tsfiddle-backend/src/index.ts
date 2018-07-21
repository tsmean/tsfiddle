import * as express from 'express';
import { resolve } from 'url';
import {exec} from 'child_process';
import * as fs from 'fs-extra';
const uuidv1 = require('uuid/v1');
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

// const setupCustomScript = `import {log} from '@tsfiddle/logger';
// `

const loggerAsString = `function (message?: any, ...optionalParams: any[]) {
  const div = document.createElement('DIV');
  div.innerHTML = '> ' + message;
  document.getElementById('output').appendChild(div);
}`

const setupCustomScript = `
var console: Console = {...console};
console.log = ${loggerAsString};
`;
const tearDownCustomScript = `
`

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
    const generatedFilesDirectory = `generated/${uuid}`;
    const fileWithoutExtesion = `${generatedFilesDirectory}/${uuid}`
    const tsFile = fileWithoutExtesion + '.ts';
    const jsFile = fileWithoutExtesion + '.js';
    const bundle = fileWithoutExtesion + 'bundle.js';
    await fs.outputFile(tsFile, `
${setupCustomScript}
${input}
${tearDownCustomScript}
`);
    console.log(await fs.readFile(tsFile, 'utf8'));
    try {
      await execPromise(`tsc --lib es5,es2015,dom ${tsFile}`);
    } catch (err) {
      res.send({
        compilationError: err
      });
    }
    await doBrowserify2(jsFile, bundle);
    const js = await fs.readFile(bundle, 'utf8');
    await fs.remove(`${generatedFilesDirectory}`);
    res.send({compiledJS: js});
  } catch (err) {
    res.status(500).send(err);
  }
});
const port = 5638
app.listen(port);
console.log(`listening on port ${port}`);
