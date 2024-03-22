import pg from "pg";
import{DBConfig} from "./db.js";

const client = new pg.Client(DBConfig);
client.connect();

const sql  = "SELECt * FROM events";
const respuesta = await client.query(sql);