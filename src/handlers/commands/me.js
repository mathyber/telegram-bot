const User = require('../../database/models/user');

module.exports = async (ctx) => {
    const { id, username } = ctx.from;
    const isPremium = await User.isPremiumActive(id);

    let message = `Информация о вас:\n`;
    message += `ID: ${id}\n`;
    message += `Username: @${username || 'не указан'}\n`;
    message += `Премиум: ${isPremium ? 'Активен' : 'Не активен'}`;

    if (isPremium) {
        const user = await User.get('SELECT premiumUntil FROM users WHERE id = ?', [id]);
        message += `\nДействует до: ${new Date(user.premiumUntil).toLocaleDateString('ru-RU')}`;
    }

    await ctx.reply(message);
};