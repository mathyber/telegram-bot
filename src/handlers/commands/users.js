const { adminId, pagination } = require('../../config/config');
const userService = require('../../services/userService');
const { formatUserList } = require('../../utils/helpers');

module.exports = async (ctx) => {
    if (ctx.from.id.toString() !== adminId) {
        return ctx.reply('Эта команда доступна только администратору');
    }

    const { users, total } = await userService.getUsers(1, pagination.perPage);
    const totalPages = Math.ceil(total / pagination.perPage);

    await ctx.reply(
        formatUserList(users, 1, total),
        {
            reply_markup: totalPages > 1 ? {
                inline_keyboard: [
                    [{ text: 'Далее →', callback_data: 'users:2' }]
                ]
            } : undefined
        }
    );
};