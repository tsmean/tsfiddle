import * as express from 'express';
import { registerTranspileTypescript } from './web/controllers/transpile.controller';
import { registerFiddleCRUD } from './web/controllers/fiddle.controller';
var cors = require('cors');
var bodyParser = require('body-parser');
import "reflect-metadata"; // needed for typeorm
import { getDatabaseConnection } from './entity/connection';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static('ng-dist/tsfiddle-frontend'));
registerTranspileTypescript(app);
registerFiddleCRUD(app);
const port = 5638;
async function startApp() {
    try {
        await getDatabaseConnection();
    } catch {
        console.error('Exiting program since db connection could not be established');
        process.exit(1);
    }
    app.listen(port);
    console.log(`listening on port ${port}`);
}
startApp();
