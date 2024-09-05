import postgres from 'postgres'

const sql = postgres({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_ENDPOINT,
    database: 'postgres',
    port: 4455,
}) // will use psql environment variables

export default sql