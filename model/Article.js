const { db } = require('../server/db');
const TABLE_NAME = 'articles';

class Article {
    constructor(id, title, body) {
        this.id = id;
        this.title = title;
        this.body = body;
    }
    static async createTableIfNotExists() {
        return new Promise((resolve, reject) => {
            try {
                db.serialize(() => {
                    db.run(`
                    CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
                        id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
                        title	TEXT NOT NULL,
                        body	TEXT NOT NULL
                    );
                    `);
                });
                return resolve(0);
            } catch (err) {
                return reject(err);
            }
        });
    }

    static async save(obj) {
        return new Promise((resolve, reject) => {
            try {
                const sql = `INSERT OR REPLACE INTO ${TABLE_NAME} (id, title, body) VALUES($id, $title, $body)`;
                console.log(sql, obj);
                db.run(sql,
                    { $id: obj.id, $title: obj.title, $body: obj.body },
                    function (err){
                        return err ? reject(err) : resolve(this.lastID);
                    }
                );
            } catch (err) {
                return reject(err);
            }
        });
    }

    static async update(id, obj) {
        return new Promise((resolve, reject) => {
            try {
                const sql = `UPDATE ${TABLE_NAME} SET title=$title, body=$body WHERE id=$id`;
                console.log(sql, id, obj);
                db.run(sql,
                    { $id: id, $title: obj.title, $body: obj.body },
                    function (err){
                        return err ? reject(err) : resolve(this.lastID);
                    }
                );
            } catch (err) {
                return reject(err);
            }
        });
    }

    static async create(obj) {
        const rowId = await Article.save(obj);
        const insertedObj = await Article.get(rowId);
        return insertedObj;
    }

    static async get(id) {
        return new Promise((resolve, reject) => {
            try {
                db.get(`SELECT * FROM ${TABLE_NAME} WHERE id=$id`,
                    { $id: id },
                    function (err, res) {
                        return err ? reject(err) : resolve(res);
                    })
            } catch (err) {
                return reject(err);
            }
        });
    }

    static async count() {
        return new Promise((resolve, reject) => {
            db.get(`SELECT COUNT(*) FROM ${TABLE_NAME}`, function (err, row) {
                return err ? reject(err) : resolve(row["COUNT(*)"])
            })
        })
    }

    static async list(offset, limit) {
        const result = []
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all(`SELECT * FROM ${TABLE_NAME}
            ORDER BY title LIMIT ${limit} OFFSET ${offset}`,
                    function (err, rows) {
                        if (err) return reject(err)
                        rows.forEach(row => {
                            result.push(new Article(row["id"], row["title"], row["body"]))
                        })
                        return resolve(result)
                    })
            })
        })
    }

    static async listAll() {
        const result = []
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all(`SELECT * FROM ${TABLE_NAME} ORDER BY title`,
                    function (err, rows) {
                        if (err) return reject(err)
                        rows.forEach(row => {
                            result.push(new Article(row["id"], row["title"], row["body"]))
                        })
                        return resolve(result)
                    })
            })
        })
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            try {
                const sql = `DELETE FROM ${TABLE_NAME} WHERE id = $id`;
                console.log(sql, id);
                db.run(sql, {$id:id});
                return resolve(id);
            } catch (err) {
                return reject(err)
            }
        })
    }
}


module.exports = Article