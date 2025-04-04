const {commands, adminCommands} = require("../../config/config");
module.exports = async (ctx) => {
    await ctx.reply(
        'Доступные команды:\n\n' +
        commands.join('\n') +
        '\n\nДля администратора:\n' +
        adminCommands.join('\n')
    );
};