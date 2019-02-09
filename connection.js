import {Pool} from 'pg';

import dotenv from 'dotenv';

dotenv.config();

let conString;
if (process.env.DATABASE_URL) {
	conString = new Pool({
		connectionString: process.env.DATABASE_URL,
	});
} else {
	conString = new Pool({
		user: 'questioner',
		host: 'localhost',
		database: 'questioner-db',
		password: null,
		port: 5432,
	});
}


module.exports = conString;