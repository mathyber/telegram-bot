const User = require('../database/models/user');

class UserService {
    async registerUser(userId, username) {
        await User.createOrUpdate(userId, username);
    }

    async grantPremium(userId) {
        await User.setPremium(userId);
    }

    async getUsers(page, perPage) {
        const users = await User.getAll(page, perPage);
        const total = await User.count();
        return { users, total };
    }

    async checkPremium(userId) {
        return await User.isPremiumActive(userId);
    }
}

module.exports = new UserService();