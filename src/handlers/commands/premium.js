const userService = require('../../services/userService');
const { premium } = require('../../config/config');

module.exports = async (ctx) => {
    const { id } = ctx.from;

    await userService.grantPremium(id);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + premium.defaultDurationDays);

    await ctx.reply(
        `Вам выдан премиум статус до ${expiresAt.toLocaleDateString('ru-RU')}!\n` +
        `Осталось ${premium.defaultDurationDays} дней.`
    );
};