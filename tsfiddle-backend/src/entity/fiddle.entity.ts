import {Entity, Column} from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity()
export class Fiddle extends BaseEntity {
    @Column()
    content: string;
}
