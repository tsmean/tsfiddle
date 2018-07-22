const uuidv1 = require('uuid/v1');
import * as fs from 'fs-extra';
import { exec } from 'child_process';
const util = require('util');
const execPromise = util.promisify(exec);

export async function transpileTypescript(input: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const uuid = uuidv1();
            const generatedFilesDirectory = `generated/${uuid}`;
            const fileWithoutExtesion = `${generatedFilesDirectory}/${uuid}`
            const tsFile = fileWithoutExtesion + '.ts';
            const jsFile = fileWithoutExtesion + '.js';
            const bundle = fileWithoutExtesion + 'bundle.js';
            await fs.outputFile(tsFile, input);
            try {
                await execPromise(`tsc --lib es5,es2015,dom ${tsFile}`);
            } catch (err) {
                return {
                    compilationError: err
                }
            }
            await doBrowserify(jsFile, bundle);
            const js = await fs.readFile(bundle, 'utf8');
            await fs.remove(`${generatedFilesDirectory}`);
            console.log('here')
            resolve({ compiledJS: js })
        } catch (err) {
            reject(err);
        }
    })
}

async function doBrowserify(jsFile, outFile) {
    await execPromise(`browserify ${jsFile} -o ${outFile}`);
}