const userService = require('../../services/userService');

module.exports = async (ctx) => {
    const { id, username } = ctx.from;
    const isPremium = await userService.checkPremium(id);

    let message = `Информация о вас:\n`;
    message += `ID: ${id}\n`;
    message += `Username: ${username ? `@${username}` : `[unknown]`}\n`;
    message += `Премиум: ${isPremium ? 'Активен' : 'Не активен'}`;

    if (isPremium) {
        const user = await userService.db.get('SELECT premiumUntil FROM users WHERE id = ?', [id]);
        message += `\nДействует до: ${new Date(user.premiumUntil).toLocaleDateString('ru-RU')}`;
    }

    await ctx.reply(message);
};