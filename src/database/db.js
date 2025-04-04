const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
    constructor() {
        this.db = new sqlite3.Database(
            path.join(__dirname, '../../database.sqlite'),
            (err) => {
                if (err) {
                    console.error('Database connection error:', err);
                }
            }
        );
        this.init();
    }

    async init() {
        try {
            // Проверяем существование таблицы
            const tableExists = await this.get(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='users'"
            );

            if (!tableExists) {
                // Создаем таблицу, если её нет
                await this.run(`
          CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT,
            isPremium BOOLEAN DEFAULT 0,
            premiumUntil TIMESTAMP,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
            } else {
                // Проверяем и добавляем недостающие столбцы
                const columns = await this.all("PRAGMA table_info(users)");
                const columnNames = columns.map(col => col.name);

                if (!columnNames.includes('premiumUntil')) {
                    await this.run('ALTER TABLE users ADD COLUMN premiumUntil TIMESTAMP');
                }
                // Можно добавить проверки других столбцов при необходимости
            }
        } catch (err) {
            console.error('Database initialization error:', err);
        }
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) reject(err);
                else resolve(this);
            });
        });
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
}

module.exports = new Database();