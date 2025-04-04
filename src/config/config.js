require('dotenv').config();

module.exports = {
    botToken: process.env.BOT_TOKEN,
    adminId: process.env.ADMIN_ID,
    pagination: {
        perPage: 10
    },
    premium: {
        defaultDurationDays: 30
    },
    commands: [
        '/me - Посмотреть информацию о себе',
        '/premium - Получить премиум статус',
        '/webapp - Открыть Web-приложение',
        '/help - Все команды'
    ],
    adminCommands: [
        '/users - Список пользователей'
    ],
    webapp: {
        url: 'https://my-telegram-webapp.example.com'
    }
};