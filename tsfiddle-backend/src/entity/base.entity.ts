import { PrimaryGeneratedColumn } from "typeorm";
import { DatabaseId } from "../models";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: DatabaseId;
}