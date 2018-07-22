import { PrimaryGeneratedColumn } from "typeorm";

export type DatabaseId = string
export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: DatabaseId;
}