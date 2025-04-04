const db = require('../db');
const { premium } = require('../../config/config');

class User {
    static async createOrUpdate(userId, username) {
        const existingUser = await db.get(
            'SELECT id FROM users WHERE id = ?',
            [userId]
        );

        if (existingUser) {
            await db.run(
                'UPDATE users SET username = ? WHERE id = ?',
                [username, userId]
            );
        } else {
            await db.run(
                'INSERT INTO users (id, username) VALUES (?, ?)',
                [userId, username]
            );
        }
    }

    static async setPremium(userId) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + premium.defaultDurationDays);

        await db.run(
            'UPDATE users SET isPremium = 1, premiumUntil = ? WHERE id = ?',
            [expiresAt.toISOString(), userId]
        );
    }

    static async getAll(page = 1, perPage = 10) {
        const offset = (page - 1) * perPage;
        return await db.all(
            'SELECT * FROM users LIMIT ? OFFSET ?',
            [perPage, offset]
        );
    }

    static async count() {
        const result = await db.get('SELECT COUNT(*) as count FROM users');
        return result.count;
    }

    static async isPremiumActive(userId) {
        const user = await db.get(
            'SELECT premiumUntil FROM users WHERE id = ?',
            [userId]
        );
        if (!user || !user.premiumUntil) return false;
        return new Date(user.premiumUntil) > new Date();
    }

    static async get(sql, params = []) {
        return await db.get(sql, params);
    }
}

module.exports = User;