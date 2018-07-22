import { Fiddle } from "../entity/fiddle.entity";
import { getDatabaseConnection } from "../entity/connection";
import { ErrorCode, ErrorObject } from "../error.codes";

export async function createFiddle(content: string) {
    return new Promise(async (resolve, reject) => {
        const fiddle = new Fiddle();
        fiddle.content = content;
        try {
            const con = await getDatabaseConnection();
            await con.manager.save(fiddle);
            resolve(fiddle);
        } catch(err) {
            console.error('Could not create entity:', fiddle);
            reject(err);
        }
        
    })
}

export async function getFiddle(id: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const con = await getDatabaseConnection();
            const repo = con.getRepository(Fiddle);
            const fiddle = await repo.findOne({id: id});
            if (fiddle != null) {
                resolve(fiddle);
            } else {
                console.error('Fiddle not found.')
                reject(new ErrorObject(ErrorCode.NOT_FOUND))
            }
        } catch (err) {
            console.error('Could not get fiddle, technical error');
            console.error(err);
            reject(new ErrorObject(ErrorCode.ORM_ERROR));
        }
    })
}