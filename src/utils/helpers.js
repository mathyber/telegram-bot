const { pagination, commands, adminCommands} = require('../config/config');

module.exports = {
    formatUserList: (users, page, total) => {
        let text = `Список пользователей (${total}):\n\n`;
        users.forEach((user, index) => {
            const premiumStatus = user.isPremium
                ? user.premiumUntil
                    ? ` ★ (до ${new Date(user.premiumUntil).toLocaleDateString('ru-RU')})`
                    : ' ★'
                : '';
            text += `${(page - 1) * pagination.perPage + index + 1}. ${user.username ? `@${user.username}` : `[unknown]`} (ID: ${user.id})${premiumStatus}\n`;
        });
        text += `\nСтраница ${page}`;
        return text;
    },
    commandsText: () => 'Доступные команды:\n\n' +
        commands.join('\n') +
        '\n\nДля администратора:\n' +
        adminCommands.join('\n')
};