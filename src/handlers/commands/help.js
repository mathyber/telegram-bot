const {commandsText} = require("../../utils/helpers");
module.exports = async (ctx) => {
    await ctx.reply(
        commandsText()
    );
};