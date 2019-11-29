const fs = require('fs');
const path = require('path');

const sqlite3 = require('sqlite3').verbose();

const INIT_SQL_PATH = process.env.INIT_SQL_PATH || path.join(__dirname, '..', 'db-init.sql');
const DB_NAME = process.env.DB_NAME || path.join(__dirname, '..', 'sqlite3.db');

const db = new sqlite3.Database(DB_NAME, err=>{
    if (err) {
        console.log('DB init error');
        console.error(err);
        return;
    }

    init();
});


function init() {
    // console.log(`Init ${DB_NAME} using ${INIT_SQL_PATH}`);
    const initSQL = fs.readFileSync(INIT_SQL_PATH, 'utf-8');
    db.exec(initSQL);
}


const Q = (queryString, params) => {
    return new Promise((resolve, reject)=>{
        db.all(queryString, (err, data)=>{
            if (err) {
                console.log('Error in query', queryString);
                console.error(err);
                return;
            }
            resolve(data);
        });
    });
};

module.exports = {db, Q};