const userService = require('../../services/userService');
const path = require("path");
const img = path.join(__dirname, '../../files/1.jpg');

module.exports = async (ctx) => {
    const { id, username } = ctx.from;
    await userService.registerUser(id, username);

    await ctx.replyWithPhoto(
        { source: img },
        {
            caption: 'Добро пожаловать! Вы зарегистрированы.\n' +
                'Используйте /help для списка команд.'
        }
    );
};