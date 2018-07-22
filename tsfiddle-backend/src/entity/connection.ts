import {createConnection, Connection} from "typeorm";
import {Fiddle} from "./fiddle.entity";
import { getConnectionOptions } from 'typeorm';

let databaseConnection;

export function getDatabaseConnection(): Promise <Connection> {
    return new Promise(async (resolve, reject) => {
        if (databaseConnection != null) {
            resolve(databaseConnection);
        } else {
            try {
                const con = await createConnection();
                databaseConnection = con;
                resolve(con);
            } catch (err) {
                console.error('Could not get database connection.');
                console.error(err);
                const connectionOptions: any = await getConnectionOptions();
                
                console.log('Connection Options were: ', connectionOptions.host, connectionOptions.port, connectionOptions.username);
                reject();
            }
        }
    })
}

async function testSetup(connection) {
    console.log("Inserting a new fiddle into the database...");
    const fiddle = new Fiddle();
    fiddle.content = `const x = 5; const y = 6; console.log('y+x')`;
    await connection.manager.save(fiddle);
    console.log("Saved a new fiddle with id: " + fiddle.id);
    
    console.log("Loading the fiddle from the database...");
    const users = await connection.manager.find(Fiddle);
    console.log("Loaded fiddles: ", fiddle);
}