import pg from "pg";
import { DBConfig } from "./db.js";
export default class eventLocationRepository
{
    constructor()
    {
        const {Client} = pg;
        this.DBClient = new Client(DBConfig);
        this.DBClient.connect();
    }
}