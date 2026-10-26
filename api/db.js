/**
 * This file is dedicated to host all database components
 * We are connecting to a postgresSQL server
 */

const { Pool } = require('pg');
const { loadEnvFile } = require('node:process');
loadEnvFile();

const pgPool = new Pool({
    user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT, 
	max: 50, 
	idleTimeoutMillis: 1000, 
	connectionTimeoutMillis: 6000
})

async function pgGetPool() {
    return await pgPool.connect();
}

module.exports = {
    pgGetPool
}