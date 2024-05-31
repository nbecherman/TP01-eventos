import 'dotenv/config'
export const DBConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD ?? 'root',
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST
};