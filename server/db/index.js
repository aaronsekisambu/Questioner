import {Pool} from 'pg';

import dotenv from 'dotenv';
import conString from '../../connection';

dotenv.config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });



module.exports = {
  query(text, params){
    return new Promise((resolve, reject) => {
      conString.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
