import { DatabaseId, HashedDatabaseId } from "../models";

// https://github.com/ivanakimov/hashids.js
const Hashids = require('hashids');
const hashids = new Hashids('', 8);

export function hashId(id: DatabaseId): string {
    return hashids.encode(id);
}

export function decodeHashedId(hashedId: HashedDatabaseId) {
    return hashids.decode(hashedId)[0];
}