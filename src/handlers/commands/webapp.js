module.exports = async (ctx) => {
    await ctx.reply('Открыть Web-приложение:', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Запустить Web App',
                    web_app: { url: 'https://my-telegram-webapp.example.com' }
                }]
            ]
        }
    });
};