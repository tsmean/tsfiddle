import * as express from 'express';
import { registerTranspileTypescript } from './web/controllers/transpile.controller';
import { registerFiddleCRUD } from './web/controllers/fiddle.controller';
var cors = require('cors');
var bodyParser = require('body-parser');
import "reflect-metadata"; // needed for typeorm
import { getDatabaseConnection } from './entity/connection';
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../ng-dist/tsfiddle-frontend')));
registerTranspileTypescript(app);
registerFiddleCRUD(app);
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../ng-dist/tsfiddle-frontend/index.html'));
});
const port = 5638;
async function startApp() {
    try {
        await getDatabaseConnection();
        console.log('Established connection to database...');
    } catch {
        console.log('well, looks like the db isnt connected, but the app is still useful...');
    }
    app.listen(port);
    console.log(`listening on port ${port}`);
}
startApp();
