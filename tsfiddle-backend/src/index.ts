import * as express from 'express';
import { registerTranspileTypescript } from './web/controllers/transpile.controller';
var cors = require('cors');
var bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

enum STATUS_CODES {
  BAD_REQUEST = 400
}
app.use('/', express.static('ng-dist/tsfiddle-frontend'));
registerTranspileTypescript(app);

const port = 5638
app.listen(port);
console.log(`listening on port ${port}`);
