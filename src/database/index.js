const dotenv = require('dotenv');
dotenv.config();
const {Client} = require('pg');

const client = new Client({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

client.connect();

exports.query = async (query,values) => {
    const {rows} = await client.query(query,values)
    return rows
}




