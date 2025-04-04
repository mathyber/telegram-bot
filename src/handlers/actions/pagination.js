const { pagination } = require('../../config/config');
const userService = require('../../services/userService');
const { formatUserList } = require('../../utils/helpers');

module.exports = async (ctx) => {
    const page = parseInt(ctx.match[1]);
    const { users, total } = await userService.getUsers(page, pagination.perPage);
    const totalPages = Math.ceil(total / pagination.perPage);

    const buttons = [];
    if (page > 1) buttons.push({ text: '← Назад', callback_data: `users:${page - 1}` });
    if (page < totalPages) buttons.push({ text: 'Далее →', callback_data: `users:${page + 1}` });

    await ctx.editMessageText(
        formatUserList(users, page, total),
        {
            reply_markup: {
                inline_keyboard: [buttons]
            }
        }
    );
};