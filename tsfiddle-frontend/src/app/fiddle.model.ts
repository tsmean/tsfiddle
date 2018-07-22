import { DatabaseId } from "./models";

export interface Fiddle extends _Fiddle {
    id: DatabaseId;
}

export interface UnpersistedFiddle extends _Fiddle {}

interface _Fiddle {
    content: FiddleContent
}

type FiddleContent = string;