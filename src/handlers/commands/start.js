const userService = require('../../services/userService');
const path = require("path");
const {commandsText} = require("../../utils/helpers");
const {webapp} = require("../../config/config");
const img = path.join(__dirname, '../../files/1.jpg');

module.exports = async (ctx) => {
    const { id, username } = ctx.from;
    await userService.registerUser(id, username);

    await ctx.replyWithPhoto(
        { source: img },
        {
            caption: 'Добро пожаловать!\n' +
                commandsText(),
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Открыть Web App',
                        web_app: webapp
                    }]
                ]
            }
        }
    );
};